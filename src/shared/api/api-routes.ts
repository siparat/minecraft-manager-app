export const ApiRoutes = {
	LOGIN: 'auth/login',
	GET_MY_INFO: 'user/info',
	GET_ALL_LANGUAGES: 'apps/languages',
	TRANSLATE_TEXT: 'deepl/translate',
	UPLOAD_IMAGE: 'file/image',
	UPLOAD_MODFILE: 'file/modfile',
	CREATE_APP: 'apps/'
} satisfies Record<string, string | ((...args: any[]) => string)>;
