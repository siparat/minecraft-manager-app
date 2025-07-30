import ky, { HTTPError } from 'ky';
import type { HttpError } from '../types/error';

export const httpClient = ky.create({
	prefixUrl: import.meta.env.VITE_HOST_API,
	hooks: {
		beforeError: [
			async (err): Promise<HTTPError> => {
				const errorObject = await err.response.json<HttpError>();
				if ('error' in errorObject && 'statusCode' in errorObject && 'message' in errorObject) {
					err.message = errorObject.message;
				}
				return err;
			}
		],
		beforeRequest: [
			(req): void => {
				const token = localStorage.getItem('token');
				req.headers.set('Authorization', 'Bearer ' + token);
			}
		]
	}
});
