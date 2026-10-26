import { useAppStore } from '@/entities/app';
import styles from './AppHeader.module.css';
import type { JSX } from 'react';
import { Root, Trigger } from '@radix-ui/react-dialog';
import { EditAppModal } from '@/features/create-app/ui';
import { SelectAppStatus } from '@/features/select-app-status';
import { UploadModfiles } from '@/features/upload-modfiles';
import OpenArrowIcon from '@/shared/assets/icons/open-arrow.svg?react';
import { useUserStore } from '@/entities/user';
import { canManageOwned, isManager } from '@/entities/user/model';

export const AppHeader = (): JSX.Element => {
	const app = useAppStore((store) => store.app);
	const user = useUserStore((store) => store.user);

	if (!app) {
		return <></>;
	}

	const canEditApp = canManageOwned(user, app.createdById);
	const canUseAppTools = !isManager(user) || canEditApp;

	return (
		<div className={styles['header']}>
			<div className={styles['logo']}>
				<img src={app.logo} alt={app.packageName} />
			</div>
			<div className={styles['info']}>
				<div className={styles['titleWrapper']}>
					<h1 className={styles['title']}>{app.translations[0].name}</h1>
					{canEditApp && (
						<Root>
							<Trigger asChild>
								<button>✏️</button>
							</Trigger>
							<EditAppModal appData={app} />
						</Root>
					)}
				</div>
				<div className={styles['packageName']}>
					<p>{app.packageName}</p>
					<a target="_blank" href={'https://play.google.com/store/apps/details?id=' + app.packageName}>
						<OpenArrowIcon />
					</a>
				</div>
				{canUseAppTools && <SelectAppStatus />}
				{canUseAppTools && <UploadModfiles />}
			</div>
		</div>
	);
};
