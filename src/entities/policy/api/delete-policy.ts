import { ApiRoutes, httpClient } from '@/shared/api';

export const deletePolicy = (slug: string): Promise<void> => {
	return httpClient.delete(ApiRoutes.DELETE_POLICY(slug)).json();
};
