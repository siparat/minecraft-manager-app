import { ApiRoutes, httpClient } from '@/shared/api';
import type { Mod } from '../model';

export const deleteMod = (modId: number): Promise<Mod> => {
	return httpClient.delete(ApiRoutes.DELETE_MOD_BY_ID(modId)).json();
};
