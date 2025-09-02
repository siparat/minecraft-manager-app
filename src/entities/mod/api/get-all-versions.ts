import { ApiRoutes, httpClient } from '@/shared/api';
import type { ModVersion } from '../model';

export const getAllVersions = (): Promise<ModVersion[]> => {
	return httpClient.get(ApiRoutes.GET_ALL_MODS_VERSIONS).json();
};
