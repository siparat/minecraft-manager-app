import { Close, Content, DialogTitle, Overlay, Portal } from '@radix-ui/react-dialog';
import { useEffect, type JSX } from 'react';
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
import { ModCategoryLabels, useModStore, type Mod } from '@/entities/mod';

type FormValues = z.infer<typeof CreateModSchema>;

interface Props {
	modData: Mod;
	reloadPage?: boolean;
}

export const EditModModal = ({ modData, reloadPage = true }: Props): JSX.Element => {
	const versions = useModStore((state) => state.allVersions);
	const navigate = useNavigate();
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
	}, [modData, setValue]);

	const onSubmit = async (dto: FormValues): Promise<void> => {
		const toastId = toast.loading('Редактирование мода...');
		try {
			await editMod(modData.id, dto);
			toast.success('Мод успешно редактирован', { id: toastId });
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
		<Portal>
			<Overlay className="dialogOverlay" />
			<Content className="dialogContent">
				<VisuallyHidden asChild>
					<DialogTitle>Редактировать мод</DialogTitle>
				</VisuallyHidden>
				<ContentBox className={styles['modal']} title="Редактировать мод">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input {...register('title')} error={errors.title?.message} label="Заголовок" placeholder="Генератор домов" />

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
							error={errors.files?.message}
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
			</Content>
		</Portal>
	);
};
