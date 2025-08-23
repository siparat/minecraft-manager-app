import type { JSX } from 'react';
import styles from './AppDashboard.module.css';
import { DashboardTab } from '@/entities/dashboard-tab';
import { Routes } from '@/shared/config';
import { useAppStore } from '@/entities/app';

export const AppDashboard = (): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const issuesCounts = useAppStore((state) => state.issuesCounts);

	if (!app) {
		return <></>;
	}

	return (
		<div className={styles['dashboard']}>
			<DashboardTab
				value={app._count.mods}
				title="Моды"
				description="Привязать или отвязать моды к сборке"
				to={Routes.APP_MODS.replace(':id', app.id.toString())}
				color="#578BFA"
			/>
			<DashboardTab
				value={issuesCounts && issuesCounts.created}
				title="Жалобы"
				description="Жалобы от пользователей"
				to={Routes.APP_ISSUES.replace(':id', app.id.toString())}
				color="#FA5757"
			/>
			<DashboardTab
				title="SDK и реклама"
				description="Управление рекламой в приложении"
				to={Routes.APP_SDK.replace(':id', app.id.toString())}
				color="#FAD457"
			/>
			<DashboardTab
				title="Отзывы"
				description="Отзывы и уведомления из Google Play Console"
				to={Routes.APP_FEEDBACKS.replace(':id', app.id.toString())}
				color="#62FA57"
			/>
		</div>
	);
};
