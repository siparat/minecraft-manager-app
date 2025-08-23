import { ApiRoutes, httpClient } from '@/shared/api';
import type { AppIssuesCounts } from '../model';

export const getAppIssuesCounts = (appId: number): Promise<AppIssuesCounts> => {
	return httpClient.get(ApiRoutes.GET_ISSUES_COUNTS(appId)).json();
};
