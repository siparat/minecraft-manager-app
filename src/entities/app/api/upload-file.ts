import { ApiRoutes, httpClient } from '@/shared/api';
import type { App } from '../model';

export const uploadAppFile = (type: 'apk' | 'bundle', appId: number, file: File): Promise<App> => {
	const formData = new FormData();
	formData.append(type, file);
	return httpClient.post(ApiRoutes[type == 'apk' ? 'UPLOAD_APK' : 'UPLOAD_BUNDLE'](appId), { body: formData, timeout: false }).json();
};
