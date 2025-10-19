import { ApiRoutes, httpClient } from '@/shared/api';

export const setAppModsOrder = async (appId: number, order: number[]): Promise<void> => {
	await httpClient.post(ApiRoutes.SET_APP_MODS_ORDER(appId), { json: { order } });
};
