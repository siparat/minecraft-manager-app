import { AppsTable } from '@/features/apps-table';
import { Title } from '@/shared/ui';
import type { JSX } from 'react';
import { Helmet } from 'react-helmet-async';

export const MainPage = (): JSX.Element => {
	return (
		<>
			<Helmet>
				<title>Приложения</title>
			</Helmet>
			<Title tag="h1">Приложения</Title>
			<AppsTable />
		</>
	);
};
