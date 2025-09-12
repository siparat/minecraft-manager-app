import { ContentBox } from '@/shared/ui';
import { Content, DialogTitle, Overlay, Portal } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useMemo, type JSX } from 'react';
import styles from './DownloadAppFilesModal.module.css';
import { useAppStore } from '@/entities/app';
import type { IFile } from '@/entities/dropzone';
import { getFilenameFromUrl } from '@/shared/lib';
import { UploadedFile } from '@/entities/dropzone/ui';

export const DownloadAppFilesModal = (): JSX.Element => {
	const app = useAppStore((state) => state.app);

	const files: Omit<IFile, 'isImage'>[] = useMemo(() => {
		if (!app) {
			return [];
		}
		const result = [
			{ filename: getFilenameFromUrl(app.apk) || '', url: app.apk || '' },
			{ filename: getFilenameFromUrl(app.bundle) || '', url: app.bundle || '' }
		];
		return result.concat(app.appScreenshots.map((s) => ({ url: s, filename: getFilenameFromUrl(s) || '' })));
	}, [app]);

	if (!app) {
		return <></>;
	}

	return (
		<Portal>
			<Overlay className="dialogOverlay" />
			<Content className="dialogContent">
				<VisuallyHidden asChild>
					<DialogTitle>Скачать файлы</DialogTitle>
				</VisuallyHidden>
				<ContentBox className={styles['modal']} title="Скачать файлы">
					<div>
						{files.map((f) => (
							<UploadedFile key={f.filename} file={{ ...f, isImage: false }} />
						))}
					</div>
				</ContentBox>
			</Content>
		</Portal>
	);
};
