import { ApiRoutes, httpClient } from '@/shared/api';
import type { AppAd } from '../model';

export const getAppAds = (appId: number): Promise<AppAd[]> => httpClient.get(ApiRoutes.GET_APP_ADS(appId)).json();

export const createAppAd = (appId: number, ad: AppAd): Promise<AppAd> =>
	httpClient.post(ApiRoutes.CREATE_APP_AD(appId), { json: ad }).json();

export const updateAppAd = (appId: number, adId: string, ad: Partial<Pick<AppAd, 'label' | 'isEnabled'>>): Promise<AppAd> =>
	httpClient.put(ApiRoutes.UPDATE_APP_AD(appId, adId), { json: ad }).json();

export const deleteAppAd = (appId: number, adId: string): Promise<void> =>
	httpClient.delete(ApiRoutes.DELETE_APP_AD(appId, adId)).then(() => undefined);

export const exportAppAds = (appId: number): Promise<AppAd[]> => httpClient.get(ApiRoutes.EXPORT_APP_ADS(appId)).json();

export const importAppAds = (appId: number, ads: AppAd[]): Promise<{ count: number }> =>
	httpClient.post(ApiRoutes.IMPORT_APP_ADS(appId), { json: ads }).json();
