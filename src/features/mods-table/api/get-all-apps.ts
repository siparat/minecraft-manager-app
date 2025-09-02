import type { App } from '@/entities/app';
import { ApiRoutes, httpClient } from '@/shared/api';

export const getAllApps = async (): Promise<App[]> => {
	return httpClient.get(ApiRoutes.GET_ALL_APPS).json();
};
