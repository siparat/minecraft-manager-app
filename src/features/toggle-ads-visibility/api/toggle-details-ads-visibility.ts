import type { AppSdk, AppSdkAdsType } from '@/entities/app';
import { ApiRoutes, httpClient } from '@/shared/api';

export const toggleDetailsAdsVisibility = async (appId: number, type: AppSdkAdsType): Promise<AppSdk> => {
	return httpClient.post(ApiRoutes.TOGGLE_DETAILS_ADS_VISIBILITY(appId, type)).json();
};
