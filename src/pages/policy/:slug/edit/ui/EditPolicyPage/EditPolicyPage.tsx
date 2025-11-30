import type { Policy } from '@/entities/policy';
import { EditPolicyForm } from '@/features/edit-policy';
import { Title } from '@/shared/ui';
import type { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';

export const EditPolicyPage = (): JSX.Element => {
	const { policy } = useLoaderData<{ policy: Policy }>();

	return (
		<>
			<Helmet>
				<title>Редактировать политику {policy.title}</title>
			</Helmet>
			<Title tag="h1">Редактировать политику {policy.title}</Title>
			<EditPolicyForm data={policy} />
		</>
	);
};
