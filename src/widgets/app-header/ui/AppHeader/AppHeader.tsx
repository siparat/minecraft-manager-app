import { useAppStore } from '@/entities/app';
import styles from './AppHeader.module.css';
import type { JSX } from 'react';
import { Root, Trigger } from '@radix-ui/react-dialog';
import { EditAppModal } from '@/features/create-app/ui';
import { SelectAppStatus } from '@/features/select-app-status';
import { UploadModfiles } from '@/features/upload-modfiles';
import OpenArrowIcon from '@/shared/assets/icons/open-arrow.svg?react';

export const AppHeader = (): JSX.Element => {
	const app = useAppStore((store) => store.app);

	if (!app) {
		return <></>;
	}

	return (
		<div className={styles['header']}>
			<div className={styles['logo']}>
				<img src={app.logo} alt={app.packageName} />
			</div>
			<div className={styles['info']}>
				<div className={styles['titleWrapper']}>
					<h1 className={styles['title']}>{app.translations[0].name}</h1>
					<Root>
						<Trigger asChild>
							<button>✏️</button>
						</Trigger>
						<EditAppModal appData={app} />
					</Root>
				</div>
				<div className={styles['packageName']}>
					<p>{app.packageName}</p>
					<a target="_blank" href={'https://play.google.com/store/apps/details?id=' + app.packageName}>
						<OpenArrowIcon />
					</a>
				</div>
				<SelectAppStatus />
				<UploadModfiles />
			</div>
		</div>
	);
};
