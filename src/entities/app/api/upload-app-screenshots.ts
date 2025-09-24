import { ApiRoutes, httpClient } from '@/shared/api';
import type { App } from '../model';

export const uploadAppScreenshots = (appId: number, files: File[]): Promise<App> => {
	const formData = new FormData();
	files.forEach((f) => formData.append('screenshot', f));
	return httpClient.post(ApiRoutes.UPLOAD_SCREENSHOTS(appId), { body: formData, timeout: false }).json();
};
