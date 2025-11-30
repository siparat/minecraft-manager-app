import { CreateNewPolicyForm } from '@/features/create-new-policy';
import { Title } from '@/shared/ui';
import type { JSX } from 'react';
import { Helmet } from 'react-helmet-async';

export const CreatePolicyPage = (): JSX.Element => {
	return (
		<>
			<Helmet>
				<title>Написать новую политику</title>
			</Helmet>
			<Title tag="h1">Написать новую политику</Title>
			<CreateNewPolicyForm />
		</>
	);
};
