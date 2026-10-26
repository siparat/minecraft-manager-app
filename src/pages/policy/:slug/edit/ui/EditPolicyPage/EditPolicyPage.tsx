import type { Policy } from '@/entities/policy';
import { EditPolicyForm } from '@/features/edit-policy';
import { Title } from '@/shared/ui';
import type { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useLoaderData } from 'react-router-dom';
import { Routes } from '@/shared/config';
import { useUserStore } from '@/entities/user';
import { canManageOwned } from '@/entities/user/model';

export const EditPolicyPage = (): JSX.Element => {
	const { policy } = useLoaderData<{ policy: Policy }>();
	const user = useUserStore((state) => state.user);

	if (!canManageOwned(user, policy.createdById)) {
		return <Navigate to={Routes.POLICIES} replace />;
	}

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
