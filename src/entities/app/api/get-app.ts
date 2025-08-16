import { ApiRoutes, httpClient } from '@/shared/api';
import type { App } from '../model';

export const getApp = (appId: number): Promise<App> => {
	return httpClient.get(ApiRoutes.GET_APP_BY_ID(appId)).json();
};
