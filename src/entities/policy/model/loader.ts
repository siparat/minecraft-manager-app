import type { Policy } from './types';
import { getAllPolicies, getPolicyBySlug } from '../api';
import { usePolicyStore } from './store';
import type { LoaderFunctionArgs } from 'react-router-dom';

export interface PoliciesLoaderData {
	policies: Omit<Policy, 'content'>[];
}

export interface PolicyLoaderData {
	policy: Policy;
}

export const policiesLoader = async (): Promise<PoliciesLoaderData> => {
	const { setPolicies } = usePolicyStore.getState();

	const policies = await getAllPolicies();
	setPolicies(policies);

	return { policies };
};

export const policyLoader = async (args: LoaderFunctionArgs): Promise<PolicyLoaderData> => {
	const slug = args.params.slug;
	if (!slug) {
		throw new Error('Политика не найдена');
	}

	const policy = await getPolicyBySlug(slug);

	return { policy };
};
