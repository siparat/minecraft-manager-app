import type { AppIssue } from '@/entities/app';
import { ApiRoutes, httpClient } from '@/shared/api';

export const deleteAppIssue = (appId: number, issueId: number): Promise<AppIssue> => {
	return httpClient.post(ApiRoutes.DELETE_APP_ISSUE(appId, issueId)).json();
};
