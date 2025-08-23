import { ApiRoutes, httpClient } from '@/shared/api';
import type { AppIssue } from '../model';

export const getAppIssues = async (appId: number): Promise<AppIssue[]> => {
	return httpClient.get(ApiRoutes.GET_ALL_APP_ISSUES(appId)).json();
};
