import { useAllAppsQuery } from '@/features/apps-table/model';
import { Title } from '@/shared/ui';
import { useEffect, type JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { ChangeAppOrders } from '@/features/change-app-orders';
import styles from './ChangeAppOrderPage.module.css';

export const ChangeAppOrderPage = (): JSX.Element => {
	const { error, isError, isLoading, data } = useAllAppsQuery();

	useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
	}, [error]);

	if (isError) return <p>Ошибка загрузки</p>;
	if (isLoading || !data) return <p>Загрузка...</p>;

	return (
		<>
			<Helmet>
				<title>Изменить порядок приложений</title>
			</Helmet>
			<Title tag="h1">Изменить порядок приложений</Title>
			<ChangeAppOrders className={styles['changeOrdersBlock']} apps={data} />
		</>
	);
};
