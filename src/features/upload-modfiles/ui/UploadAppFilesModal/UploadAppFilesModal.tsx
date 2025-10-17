import { ContentBox } from '@/shared/ui';
import { Content, DialogTitle, Overlay, Portal } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { type JSX } from 'react';
import styles from './UploadAppFilesModal.module.css';
import { Dropzone, type UploadedFileResponse } from '@/entities/dropzone';
import { uploadAppFile, uploadAppScreenshots, useAppStore } from '@/entities/app';
import { getFilenameFromUrl } from '@/shared/lib';
import toast from 'react-hot-toast';
import { HTTPError } from 'ky';
import { uploadAppFirebase } from '@/entities/app/api';

export const UploadAppFilesModal = (): JSX.Element => {
	const app = useAppStore((state) => state.app);

	const onLoad = async (type: 'apk' | 'bundle', files: File[]): Promise<UploadedFileResponse[]> => {
		const uploadedFile = await uploadAppFile(type, app!.id, files[0]);
		return [{ filename: getFilenameFromUrl(uploadedFile[type]) || '', url: uploadedFile[type] || '' }];
	};

	const uploadScreenshots = async (files: File[]): Promise<UploadedFileResponse[]> => {
		const toastId = toast.loading('Загрузка файлов...');
		try {
			const result = await uploadAppScreenshots(app!.id, files);
			toast.success('Скриншоты успешно загружены', { id: toastId });
			return result.appScreenshots.map((f) => ({ filename: getFilenameFromUrl(f) || '', url: f }));
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message, { id: toastId });
			}
			return [];
		}
	};

	const uploadFirebaseFile = async (file: File): Promise<UploadedFileResponse[]> => {
		const toastId = toast.loading('Загрузка файла...');
		try {
			const uploadedFile = await uploadAppFirebase(app!.id, file);
			toast.success('Файл успешно загружен', { id: toastId });
			return [{ filename: getFilenameFromUrl(uploadedFile.firebaseFile) || '', url: uploadedFile.firebaseFile || '' }];
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message, { id: toastId });
			}
			return [];
		}
	};

	if (!app) {
		return <></>;
	}

	return (
		<Portal>
			<Overlay className="dialogOverlay" />
			<Content className="dialogContent">
				<VisuallyHidden asChild>
					<DialogTitle>Загрузить файлы</DialogTitle>
				</VisuallyHidden>
				<ContentBox className={styles['modal']} title="Загрузить файлы">
					<div className={styles['dropzones']}>
						<Dropzone
							hideDeletion
							defaultValue={app.apk ? [{ isImage: false, url: app.apk, filename: getFilenameFromUrl(app.apk) || '' }] : []}
							uploadFile={(files) => onLoad('apk', files)}
							placeholder="Прикрепить файл .apk"
							label="Файл .apk"
						/>
						<Dropzone
							hideDeletion
							defaultValue={
								app.bundle ? [{ isImage: false, url: app.bundle, filename: getFilenameFromUrl(app.bundle) || '' }] : []
							}
							uploadFile={(files) => onLoad('bundle', files)}
							placeholder="Прикрепить файл .aab"
							label="Файл .aab"
						/>
						<Dropzone
							isMultifile
							hideDeletion
							defaultValue={app.appScreenshots.map((s) => ({ isImage: false, url: s, filename: getFilenameFromUrl(s) || '' }))}
							uploadFile={(files) => uploadScreenshots(files)}
							placeholder="Загрузите скриншоты приложения"
							types={['image/png', 'image/jpeg', 'image/webp', 'image/gif']}
							label="Скриншоты приложения"
						/>
						<Dropzone
							hideDeletion
							defaultValue={
								app.firebaseFile
									? [{ isImage: false, url: app.firebaseFile, filename: getFilenameFromUrl(app.firebaseFile) || '' }]
									: []
							}
							uploadFile={(files) => uploadFirebaseFile(files[0])}
							placeholder="Загрузить Firebase ID"
							types={['application/json']}
							label="Firebase File ID"
						/>
					</div>
				</ContentBox>
			</Content>
		</Portal>
	);
};
