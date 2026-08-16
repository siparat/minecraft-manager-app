import { ApiRoutes, httpClient } from '@/shared/api';
import type { ModDownloadsSummary } from '../model';

export const getModDownloads = (modId: number): Promise<ModDownloadsSummary> => {
	return httpClient.get(ApiRoutes.GET_MOD_DOWNLOADS(modId)).json();
};
