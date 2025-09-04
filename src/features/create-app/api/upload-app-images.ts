import type { UploadedFileResponse } from '@/entities/dropzone';
import { ApiRoutes, httpClient } from '@/shared/api';

export const uploadFile = async (files: File[], isImage: boolean = false, oldImageFilename?: string): Promise<UploadedFileResponse[]> => {
	const result: UploadedFileResponse[] = [];
	for (const file of files) {
		const formData = new FormData();
		formData.append(isImage ? 'image' : 'modfile', file);
		if (oldImageFilename && oldImageFilename.endsWith('.webp')) {
			formData.append('oldImageFilename', oldImageFilename);
		}
		const response = await httpClient
			.post(ApiRoutes[isImage ? 'UPLOAD_IMAGE' : 'UPLOAD_MODFILE'], { body: formData })
			.json<UploadedFileResponse>();
		result.push(response);
	}
	return result;
};
