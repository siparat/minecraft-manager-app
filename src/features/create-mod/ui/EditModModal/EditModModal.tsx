import { Close, Content, DialogTitle, Overlay, Portal } from '@radix-ui/react-dialog';
import { useEffect, useMemo, useState, type JSX } from 'react';
import styles from './EditModModal.module.css';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button, ContentBox, Input, Textarea } from '@/shared/ui';
import { useForm } from 'react-hook-form';
import { Dropzone } from '@/entities/dropzone';
import type z from 'zod';
import { CreateModSchema, ModCategory } from 'minecraft-manager-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadFile } from '@/features/create-app';
import { uploadModfiles, editMod } from '../..';
import { Select } from 'antd';
import toast from 'react-hot-toast';
import { HTTPError } from 'ky';
import { useNavigate } from 'react-router-dom';
import {
	getModDownloads,
	getModReactions,
	ModCategoryLabels,
	useModStore,
	type Mod,
	type ModDownloadsSummary,
	type ModReactionSummary
} from '@/entities/mod';

type FormValues = z.infer<typeof CreateModSchema>;

interface Props {
	modData: Mod;
	reloadPage?: boolean;
	onSuccess?: () => void;
}

const REACTIONS = [
	{ type: 'LIKE', emoji: '👍', label: 'Нравится' },
	{ type: 'FIRE', emoji: '🔥', label: 'Огонь' },
	{ type: 'LOVE', emoji: '❤️', label: 'Любовь' },
	{ type: 'FUNNY', emoji: '😂', label: 'Смешно' },
	{ type: 'WOW', emoji: '😮', label: 'Вау' }
] as const;

const EditModModalContent = ({ modData, reloadPage = true, onSuccess }: Props): JSX.Element => {
	const versions = useModStore((state) => state.allVersions);
	const navigate = useNavigate();
	const [reactions, setReactions] = useState<ModReactionSummary>();
	const [downloads, setDownloads] = useState<ModDownloadsSummary>();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: zodResolver(CreateModSchema),
		defaultValues: { descriptionImages: [] }
	});

	useEffect(() => {
		setValue('description', modData.description);
		setValue('files', modData.files);
		setValue('image', modData.image);
		setValue('title', modData.title);
		setValue('category', modData.category);
		setValue(
			'versions',
			modData.versions.map(({ version }) => version)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		Promise.all([getModReactions(modData.id), getModDownloads(modData.id)])
			.then(([reactions, downloads]) => {
				setReactions(reactions);
				setDownloads(downloads);
			})
			.catch(() => undefined);
	}, [modData.id]);

	const maxReactionCount = useMemo(
		() => Math.max(1, ...REACTIONS.map(({ type }) => reactions?.counts[type] ?? 0)),
		[reactions]
	);

	const onSubmit = async (dto: FormValues): Promise<void> => {
		const toastId = toast.loading('Редактирование мода...');
		try {
			await editMod(modData.id, dto);
			toast.success('Мод успешно редактирован', { id: toastId });
			onSuccess?.();
			if (reloadPage) {
				navigate(0);
			}
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message, { id: toastId });
			}
		}
	};

	return (
		<ContentBox className={styles['modal']} title="Редактировать мод">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input {...register('title')} error={errors.title?.message} label="Заголовок" placeholder="Генератор домов" />

				<div className={styles['stats']}>
					<section className={styles['statCard']} aria-label="Реакции пользователей">
						<div className={styles['statHeader']}>
							<span>Реакции пользователей</span>
							<b>{reactions?.total ?? 0}</b>
						</div>
						<div className={styles['reactionsList']}>
							{REACTIONS.map(({ type, emoji, label }) => {
								const count = reactions?.counts[type] ?? 0;
								return (
									<div className={styles['reaction']} key={type} title={label}>
										<span className={styles['reactionEmoji']}>{emoji}</span>
										<span className={styles['reactionCount']}>{count}</span>
										<span className={styles['reactionBar']} style={{ width: `${(count / maxReactionCount) * 100}%` }} />
									</div>
								);
							})}
						</div>
					</section>

					<section className={styles['statCard']} aria-label="Скачивания мода">
						<div className={styles['statHeader']}>
							<span>Скачивания</span>
							<b>{downloads?.total ?? 0}</b>
						</div>
						<div className={styles['downloadsList']}>
							{downloads?.apps.length ? (
								downloads.apps.map((app) => (
									<div className={styles['downloadItem']} key={app.appId}>
										<span title={app.packageName}>{app.name}</span>
										<b>{app.downloadsCount}</b>
									</div>
								))
							) : (
								<p className={styles['emptyStats']}>Нет данных</p>
							)}
						</div>
					</section>
				</div>

				<Textarea
					{...register('description')}
					className={styles['textarea']}
					error={errors.description?.message}
					label="Описание"
					placeholder="Описание мода"
				/>

				<Dropzone
					defaultValue={[{ isImage: true, url: modData.image, filename: modData.image }]}
					onUpload={([file]) => setValue('image', file?.url || '')}
					error={errors.image?.message}
					uploadFile={uploadFile}
					placeholder="Загрузить лого мода"
					types={['image/png', 'image/jpeg', 'image/webp', 'image/gif']}
					label="Лого"
				/>

				<Dropzone
					defaultValue={modData.descriptionImages.map((url) => ({ isImage: false, url, filename: url }))}
					isMultifile
					onUpload={(files) =>
						setValue(
							'descriptionImages',
							files.map((f) => f.url)
						)
					}
					error={errors.descriptionImages?.message}
					uploadFile={(files) => uploadFile(files, true)}
					placeholder="Загрузить фотографии в описании мода"
					types={['image/png', 'image/jpeg', 'image/webp', 'image/gif']}
					label="Фотографии в описании мода"
				/>

				<Dropzone
					defaultValue={modData.files.map((url) => ({ isImage: false, url, filename: url }))}
					isMultifile
					onUpload={(files) =>
						setValue(
							'files',
							files.map((f) => f.url)
						)
					}
					error={errors.files?.[0]?.message}
					uploadFile={uploadModfiles}
					placeholder="Прикрепить файлы .mc* или .zip"
					label="Файлы"
				/>

				<fieldset>
					<p className={styles['label']}>Категория</p>
					<Select
						defaultValue={modData.category}
						className={styles['select']}
						placeholder="Выберите категорию"
						options={Object.values(ModCategory).map((c) => ({ value: c, label: ModCategoryLabels[c] }))}
						onChange={(v) => setValue('category', v)}
					/>
					{errors.category && <p className={styles['errorMessage']}>{errors.category.message}</p>}
				</fieldset>

				<fieldset>
					<p className={styles['label']}>Совместимые версии</p>
					<Select
						className={styles['select']}
						defaultValue={modData.versions.map(({ version }) => version)}
						mode="tags"
						allowClear
						placeholder="1.21.30"
						options={versions.map(({ version }) => ({ label: version, value: version }))}
						onChange={(versions) => setValue('versions', versions)}
					/>
					{errors.versions?.length && <p className={styles['errorMessage']}>{errors.versions.find?.((v) => !!v)?.message}</p>}
				</fieldset>

				<div className={styles['wrapper']}>
					<Button appearance="primary" type="submit">
						Редактировать
					</Button>
					<Close asChild>
						<Button type="button" appearance="ghost">
							Отмена
						</Button>
					</Close>
				</div>
			</form>
		</ContentBox>
	);
};

export const EditModModal = ({ modData, reloadPage = true, onSuccess }: Props): JSX.Element => {
	return (
		<Portal>
			<Overlay className="dialogOverlay" />
			<Content className="dialogContent">
				<VisuallyHidden asChild>
					<DialogTitle>Редактировать мод</DialogTitle>
				</VisuallyHidden>
				<EditModModalContent modData={modData} reloadPage={reloadPage} onSuccess={onSuccess} />
			</Content>
		</Portal>
	);
};
