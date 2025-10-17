import { ApiRoutes, httpClient } from '@/shared/api';

export const setAppOrder = async (order: number[]): Promise<void> => {
	await httpClient.post(ApiRoutes.SET_APP_ORDER, { json: { order } });
};
