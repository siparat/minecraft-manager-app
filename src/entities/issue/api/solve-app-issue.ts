import type { AppIssue } from '@/entities/app';
import { ApiRoutes, httpClient } from '@/shared/api';

export const solveAppIssue = (appId: number, issueId: number): Promise<AppIssue> => {
	return httpClient.post(ApiRoutes.SOLVE_APP_ISSUE(appId, issueId)).json();
};
