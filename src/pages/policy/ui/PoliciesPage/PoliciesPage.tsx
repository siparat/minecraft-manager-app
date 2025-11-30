import { PoliciesList } from '@/widgets/policies-list';
import { type JSX } from 'react';
import { Helmet } from 'react-helmet-async';

export const PoliciesPage = (): JSX.Element => {
	return (
		<>
			<Helmet>
				<title>Список политик</title>
			</Helmet>
			<PoliciesList />
		</>
	);
};
