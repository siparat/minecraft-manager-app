import { ApiRoutes, httpClient } from '@/shared/api';
import type { Policy } from '../model';

export const getAllPolicies = (): Promise<Policy[]> => {
	return httpClient.get(ApiRoutes.GET_ALL_POLICIES).json();
};
