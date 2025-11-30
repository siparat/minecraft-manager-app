import { ApiRoutes, httpClient } from '@/shared/api';
import type { Policy } from '../model';

export const getPolicyBySlug = (slug: string): Promise<Policy> => {
	return httpClient.get(ApiRoutes.GET_POLICY_BY_SLUG(slug)).json();
};
