import { ApiRoutes, httpClient } from '@/shared/api';
import type { App } from '../model';

export const uploadAppFirebase = (appId: number, file: File): Promise<App> => {
	const formData = new FormData();
	formData.append('firebase', file);
	return httpClient.post(ApiRoutes.UPLOAD_APP_FIREBASE(appId), { body: formData, timeout: false }).json();
};
