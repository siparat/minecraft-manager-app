export const ApiRoutes = {
	LOGIN: 'auth/login',
	GET_MY_INFO: 'user/info'
} satisfies Record<string, string | ((...args: any[]) => string)>;
