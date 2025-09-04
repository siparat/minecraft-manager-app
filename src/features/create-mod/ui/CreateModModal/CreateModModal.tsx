import { Close, Content, DialogTitle, Overlay, Portal } from '@radix-ui/react-dialog';
import type { JSX } from 'react';
import styles from './CreateModModal.module.css';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button, ContentBox, Input, Textarea } from '@/shared/ui';
import { useForm } from 'react-hook-form';
import { Dropzone } from '@/entities/dropzone';
import type z from 'zod';
import { CreateModSchema } from 'minecraft-manager-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { uploadFile } from '@/features/create-app';
import { uploadModfiles, createMod } from '../..';
import { Select } from 'antd';
import toast from 'react-hot-toast';
import { HTTPError } from 'ky';
import { useNavigate } from 'react-router-dom';
import { useModStore } from '@/entities/mod';

type FormValues = z.infer<typeof CreateModSchema>;

export const CreateModModal = (): JSX.Element => {
	const versions = useModStore((state) => state.allVersions);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: zodResolver(CreateModSchema),
		defaultValues: { descriptionImages: [] }
	});

	const onSubmit = async (dto: FormValues): Promise<void> => {
		const toastId = toast.loading('Создание мода...');
		try {
			await createMod(dto);
			toast.success('Мод успешно создан', { id: toastId });
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
					<DialogTitle>Создать мод</DialogTitle>
				</VisuallyHidden>
				<ContentBox className={styles['modal']} title="Создать мод">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input {...register('title')} error={errors.title?.message} label="Заголовок" placeholder="Генератор домов" />

						<Textarea
							{...register('description')}
							error={errors.description?.message}
							label="Описание"
							placeholder="Описание мода"
						/>

						<Dropzone
							onUpload={(files) => setValue('image', files[0].url)}
							error={errors.image?.message}
							uploadFile={uploadFile}
							placeholder="Загрузить лого мода"
							types={['image/png', 'image/jpeg']}
							label="Лого"
						/>

						<Dropzone
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
							types={['image/png', 'image/jpeg']}
							label="Фотографии в описании мода"
						/>

						<Dropzone
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
