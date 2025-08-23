import type { UploadedFileResponse } from '@/entities/dropzone';
import { ApiRoutes, httpClient } from '@/shared/api';

export const uploadFile = async (file: File, isImage: boolean = false, oldImageFilename?: string): Promise<UploadedFileResponse> => {
	const formData = new FormData();
	formData.append(isImage ? 'image' : 'modfile', file);
	if (oldImageFilename && oldImageFilename.endsWith('.webp')) {
		formData.append('oldImageFilename', oldImageFilename);
	}
	return httpClient.post(ApiRoutes[isImage ? 'UPLOAD_IMAGE' : 'UPLOAD_MODFILE'], { body: formData }).json();
};
