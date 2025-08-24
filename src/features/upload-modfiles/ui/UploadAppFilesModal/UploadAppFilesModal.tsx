import { ContentBox } from '@/shared/ui';
import { Content, DialogTitle, Overlay, Portal } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { type JSX } from 'react';
import styles from './UploadAppFilesModal.module.css';
import { Dropzone, type UploadedFileResponse } from '@/entities/dropzone';
import { uploadAppFile, useAppStore } from '@/entities/app';
import { getFilenameFromUrl } from '@/shared/lib';

export const UploadAppFilesModal = (): JSX.Element => {
	const app = useAppStore((state) => state.app);

	const onLoad = async (type: 'apk' | 'bundle', file: File): Promise<UploadedFileResponse> => {
		const uploadedFile = await uploadAppFile(type, app!.id, file);
		return { filename: getFilenameFromUrl(uploadedFile[type]) || '', url: uploadedFile[type] || '' };
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
							defaultValue={{ isImage: false, url: app.apk || '', filename: getFilenameFromUrl(app.apk) || '' }}
							uploadFile={(file) => onLoad('apk', file)}
							placeholder="Прикрепить файл .apk"
							label="Файл .apk"
						/>
						<Dropzone
							hideDeletion
							defaultValue={{ isImage: false, url: app.bundle || '', filename: getFilenameFromUrl(app.bundle) || '' }}
							uploadFile={(file) => onLoad('bundle', file)}
							placeholder="Прикрепить файл .aab"
							label="Файл .aab"
						/>
					</div>
				</ContentBox>
			</Content>
		</Portal>
	);
};
