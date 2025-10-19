import { Title } from '@/shared/ui';
import { type JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppStore } from '@/entities/app';
import { BackToApp } from '@/features/back-to-app';
import { ChangeModsOrder } from '@/features/change-mods-order';
import { useAppModsQuery } from '@/features/app-mods-table/model';
import styles from './ChangeModsOrderPage.module.css';

export const ChangeModsOrderPage = (): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const { data } = useAppModsQuery(app?.id || NaN, true, 100, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, {
		field: 'order',
		sort: 'asc'
	});

	if (!app || !data) {
		return <></>;
	}

	return (
		<>
			<Helmet>
				<title>Изменить порядок модов в приложении {app.translations[0].name}</title>
			</Helmet>
			<BackToApp />
			<Title className={styles['title']} tag="h1">
				Изменить порядок модов в приложении {app.translations[0].name}
			</Title>
			<ChangeModsOrder className={styles['changeOrdersBlock']} app={app} mods={data.mods} />
		</>
	);
};
