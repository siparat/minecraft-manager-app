import { ApiRoutes, httpClient } from '@/shared/api';
import type { App } from '../model';

export const deleteApp = (appId: number): Promise<App> => {
	return httpClient.delete(ApiRoutes.DELETE_APP(appId)).json();
};
