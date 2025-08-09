export interface IFile {
	url: string;
	filename: string;
	isImage: boolean;
}

export interface UploadedFileResponse {
	filename: string;
	url: string;
}
