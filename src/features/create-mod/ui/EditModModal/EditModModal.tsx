import { Close, Content, DialogTitle, Overlay, Portal } from '@radix-ui/react-dialog';
import { useEffect, type JSX } from 'react';
import styles from './EditModModal.module.css';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button, ContentBox, Input, Textarea } from '@/shared/ui';
import { useForm } from 'react-hook-form';
import { Dropzone } from '@/entities/dropzone';
import type z from 'zod';
import { CreateModSchema } from 'minecraft-manager-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadFile } from '@/features/create-app';
import { uploadModfiles, editMod } from '../..';
import { Select } from 'antd';
import toast from 'react-hot-toast';
import { HTTPError } from 'ky';
import { useNavigate } from 'react-router-dom';
import { useModStore, type Mod } from '@/entities/mod';

type FormValues = z.infer<typeof CreateModSchema>;

interface Props {
	modData: Mod;
}

export const EditModModal = ({ modData }: Props): JSX.Element => {
	const versions = useModStore((state) => state.allVersions);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: zodResolver(CreateModSchema)
	});

	useEffect(() => {
		setValue('description', modData.description);
		setValue('files', modData.files);
		setValue('image', modData.image);
		setValue('title', modData.title);
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
			reset();
			navigate(0);
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
							error={errors.description?.message}
							label="Описание"
							placeholder="Описание мода"
						/>

						<Dropzone
							defaultValue={[{ isImage: true, url: modData.image, filename: modData.image }]}
							onUpload={(files) => setValue('image', files[0].url)}
							error={errors.image?.message}
							uploadFile={uploadFile}
							placeholder="Загрузить картинку мода"
							types={['image/png']}
							label="Картинка"
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
							<p className={styles['label']}>Совместимые версии</p>
							<Select
								defaultValue={modData.versions.map(({ version }) => version)}
								mode="tags"
								allowClear
								style={{ width: '100%' }}
								placeholder="1.21.30"
								options={versions.map(({ version }) => ({ label: version, value: version }))}
								onChange={(versions) => setValue('versions', versions)}
							/>
							{errors.versions?.length && <p className={styles['errorMessage']}>{errors.versions.find?.((v) => !!v)?.message}</p>}
						</fieldset>

						<div className={styles['wrapper']}>
							<Button appearance="primary" type="submit">
								Создать
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
