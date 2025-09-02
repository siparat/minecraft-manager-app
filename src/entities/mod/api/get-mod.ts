import { ApiRoutes, httpClient } from '@/shared/api';
import type { Mod } from '../model';

export const getMod = (modId: number): Promise<Mod> => {
	return httpClient.get(ApiRoutes.GET_MOD_BY_ID(modId)).json();
};
