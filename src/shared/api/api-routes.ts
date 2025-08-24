import type { AppStatus } from '@/entities/app';

export const ApiRoutes = {
	LOGIN: 'auth/login',
	GET_MY_INFO: 'user/info',
	GET_ALL_LANGUAGES: 'apps/languages',
	TRANSLATE_TEXT: 'deepl/translate',
	UPLOAD_IMAGE: 'file/image',
	UPLOAD_MODFILE: 'file/modfile',
	CREATE_APP: 'apps',
	GET_ALL_APPS: 'apps',
	EDIT_APP: (id: number): string => `apps/${id}`,
	GET_APP_BY_ID: (id: number): string => `apps/${id}`,
	DELETE_APP: (id: number): string => `apps/${id}`,
	SET_APP_STATUS: (appId: number, status: AppStatus): string => `apps/${appId}/status/${status}`,
	UPLOAD_APK: (appId: number): string => `apps/${appId}/apk`,
	UPLOAD_BUNDLE: (appId: number): string => `apps/${appId}/bundle`,
	GET_ISSUES_COUNTS: (appId: number): string => `apps/${appId}/issue/counts`,
	GET_ALL_APP_ISSUES: (appId: number): string => `apps/${appId}/issue`,
	DELETE_APP_ISSUE: (appId: number, issueId: number): string => `apps/${appId}/issue/${issueId}/delete`,
	SOLVE_APP_ISSUE: (appId: number, issueId: number): string => `apps/${appId}/issue/${issueId}/solve`,
	TOGGLE_ADS_VISIBILITY: (appId: number): string => `apps/${appId}/sdk/ads/toggle`,
	UPDATE_SDK: (appId: number): string => `apps/${appId}/sdk`
} satisfies Record<string, string | ((...args: any[]) => string)>;
