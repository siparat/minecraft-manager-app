import type { AppLanguage } from '@/entities/app';
import { ApiRoutes, httpClient } from '@/shared/api';

export const getAllLanguages = async (): Promise<AppLanguage[]> => {
	return httpClient.get(ApiRoutes.GET_ALL_LANGUAGES).json();
};
