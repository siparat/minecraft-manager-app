import type { App } from '@/entities/app';
import { ApiRoutes, httpClient } from '@/shared/api';

export const toggleAppMod = async (appId: number, modId: number): Promise<App> => {
	return httpClient.post(ApiRoutes.TOGGLE_APP_MOD(appId, modId)).json();
};
