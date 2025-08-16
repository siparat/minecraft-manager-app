import { AppsTable } from '@/features/apps-table';
import { Title } from '@/shared/ui';
import type { JSX } from 'react';

export const MainPage = (): JSX.Element => {
	return (
		<>
			<Title tag="h1">Приложения</Title>
			<AppsTable />
		</>
	);
};
