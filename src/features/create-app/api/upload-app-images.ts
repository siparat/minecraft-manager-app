import type { UploadedFileResponse } from '@/entities/dropzone';
import { ApiRoutes, httpClient } from '@/shared/api';

export const uploadFile = async (files: File[], isImage: boolean = false, oldImageFilename?: string): Promise<UploadedFileResponse[]> => {
	const formData = new FormData();
	formData.append(isImage ? 'image' : 'modfile', files[0]);
	if (oldImageFilename && oldImageFilename.endsWith('.webp')) {
		formData.append('oldImageFilename', oldImageFilename);
	}
	return [await httpClient.post(ApiRoutes[isImage ? 'UPLOAD_IMAGE' : 'UPLOAD_MODFILE'], { body: formData }).json<UploadedFileResponse>()];
};
