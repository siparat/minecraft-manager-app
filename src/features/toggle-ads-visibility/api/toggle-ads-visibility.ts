import type { AppSdk } from '@/entities/app';
import { ApiRoutes, httpClient } from '@/shared/api';

export const toggleAdsVisibility = async (appId: number): Promise<AppSdk> => {
	return httpClient.post(ApiRoutes.TOGGLE_ADS_VISIBILITY(appId)).json();
};
