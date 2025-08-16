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
	DELETE_APP: (id: number): string => `apps/${id}`
} satisfies Record<string, string | ((...args: any[]) => string)>;
