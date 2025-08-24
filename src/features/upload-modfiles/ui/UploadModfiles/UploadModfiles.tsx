import { useAppStore } from '@/entities/app';
import type { JSX } from 'react';
import styles from './UploadModfiles.module.css';
import DocumentUploadIcon from '@/shared/assets/icons/document-upload.svg?react';
import DocumentDownloadIcon from '@/shared/assets/icons/document-download.svg?react';
import classNames from 'classnames';
import { sleep } from '@/shared/lib';
import { Root, Trigger } from '@radix-ui/react-dialog';
import { UploadAppFilesModal } from '..';

export const UploadModfiles = (): JSX.Element => {
	const app = useAppStore((state) => state.app);

	const downloadFiles = async (apkPath: string | undefined, bundlePath: string | undefined): Promise<void> => {
		if (apkPath) {
			const apk = document.createElement('a');
			apk.href = apkPath;
			apk.download = apkPath;
			apk.click();
		}

		await sleep(1000);

		if (bundlePath) {
			const bundle = document.createElement('a');
			bundle.href = bundlePath;
			bundle.download = bundlePath;
			bundle.click();
		}
	};

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
				<button onClick={() => downloadFiles(app.apk, app.bundle)} className={classNames(styles['button'], styles['blue'])}>
					<DocumentDownloadIcon />
					<p>Скачать</p>
				</button>
			)}
		</div>
	);
};
