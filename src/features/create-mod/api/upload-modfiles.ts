import type { UploadedFileResponse } from '@/entities/dropzone';
import { ApiRoutes, httpClient } from '@/shared/api';

export const uploadModfiles = async (files: File[]): Promise<UploadedFileResponse[]> => {
	const formData = new FormData();
	files.forEach((file) => formData.append('modfile', file));
	return httpClient.post(ApiRoutes.UPLOAD_MODFILE, { body: formData, timeout: false }).json();
};
