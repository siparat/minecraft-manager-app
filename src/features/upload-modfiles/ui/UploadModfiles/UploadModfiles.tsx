import { useAppStore } from '@/entities/app';
import type { JSX } from 'react';
import styles from './UploadModfiles.module.css';
import DocumentUploadIcon from '@/shared/assets/icons/document-upload.svg?react';
import DocumentDownloadIcon from '@/shared/assets/icons/document-download.svg?react';
import classNames from 'classnames';
import { Root, Trigger } from '@radix-ui/react-dialog';
import { DownloadAppFilesModal, UploadAppFilesModal } from '..';

export const UploadModfiles = (): JSX.Element => {
	const app = useAppStore((state) => state.app);

	if (!app) {
		return <></>;
	}

	return (
		<div className={styles['buttons']}>
			<Root>
				<Trigger asChild>
					<button className={classNames(styles['button'], styles['green'])}>
						<DocumentUploadIcon />
						<p>Загрузить</p>
					</button>
				</Trigger>
				<UploadAppFilesModal />
			</Root>
			{(app.apk || app.bundle) && (
				<Root>
					<Trigger asChild>
						<button className={classNames(styles['button'], styles['blue'])}>
							<DocumentDownloadIcon />
							<p>Скачать</p>
						</button>
					</Trigger>
					<DownloadAppFilesModal />
				</Root>
			)}
		</div>
	);
};
