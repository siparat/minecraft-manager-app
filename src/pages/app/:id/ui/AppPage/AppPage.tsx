import { type AppLoaderData } from '@/entities/app';
import { AppDashboard } from '@/widgets/app-dashboard';
import { AppHeader } from '@/widgets/app-header';
import { type JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';

export const AppPage = (): JSX.Element => {
	const loaderData = useLoaderData<AppLoaderData>();

	return (
		<>
			<Helmet>
				<title>Приложение {loaderData.app.translations[0].name}</title>
			</Helmet>
			<AppHeader />
			<AppDashboard />
		</>
	);
};
