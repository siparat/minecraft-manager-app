import { ApiRoutes, httpClient } from '@/shared/api';
import type { App, AppStatus } from '../model';

export const setNewAppStatus = async (appId: number, status: AppStatus): Promise<App> => {
	return httpClient.patch(ApiRoutes.SET_APP_STATUS(appId, status)).json();
};
