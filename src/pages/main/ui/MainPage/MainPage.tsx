import { AppsTable } from '@/features/apps-table';
import { Title } from '@/shared/ui';
import type { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './MainPage.module.css';
import { Link } from 'react-router-dom';
import { Routes } from '@/shared/config';
import { ProtectedElement } from '@/app/ProtectedElement';
import { UserRole } from '@/entities/user/model';

export const MainPage = (): JSX.Element => {
	return (
		<>
			<Helmet>
				<title>Приложения</title>
			</Helmet>
			<div className={styles['wrapperTitle']}>
				<Title tag="h1">Приложения</Title>
				<ProtectedElement roles={[UserRole.ADMIN, UserRole.MANAGER]}>
					<Link className={styles['changeOrdersButton']} to={Routes.CHANGE_ORDERS}>
						<p>⚙️</p>
					</Link>
				</ProtectedElement>
			</div>
			<AppsTable />
		</>
	);
};
