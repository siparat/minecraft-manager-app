import { useAppStore } from '@/entities/app';
import { BackToApp } from '@/features/back-to-app';
import { type JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './AppModsPage.module.css';
import { ActiveAppModsTable, InactiveAppModsTable } from '@/features/app-mods-table';

export const AppModsPage = (): JSX.Element => {
	const app = useAppStore((state) => state.app);

	if (!app) {
		return <></>;
	}

	return (
		<div className={styles['page']}>
			<Helmet>
				<title>Моды приложения {app.translations[0].name}</title>
			</Helmet>
			<BackToApp />
			<ActiveAppModsTable />
			<InactiveAppModsTable />
		</div>
	);
};
