import { type JSX, useState, type HTMLAttributes, forwardRef, type ForwardedRef } from 'react';
import { useDropzone, type Accept } from 'react-dropzone';
import { validateFile } from '../../lib';
import classNames from 'classnames';
import styles from './Dropzone.module.css';
import TrashIcon from '@/shared/assets/icons/trash.svg?react';
import toast from 'react-hot-toast';
import { type IFile, type UploadedFileResponse } from '../../';
import { HTTPError } from 'ky';
import { UploadedFile } from '../UploadedFile/UploadedFile';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
	sizes?: [number, number];
	types?: string[];
	error?: string;
	label: string;
	defaultValue?: IFile[];
	validateFile?: (file: File) => boolean;
	placeholder?: string;
	hideDeletion?: boolean;
	onUpload?: (files: IFile[]) => any;
	uploadFile: (files: File[], isImage?: boolean, oldFilename?: string) => Promise<UploadedFileResponse[]>;
	isMultifile?: boolean;
}

export const Dropzone = forwardRef(
	(
		{
			className,
			error,
			uploadFile,
			placeholder,
			defaultValue,
			validateFile: userValidateFile,
			label,
			sizes,
			hideDeletion,
			types,
			onUpload,
			isMultifile = false,
			...props
		}: Props,
		ref: ForwardedRef<HTMLInputElement>
	): JSX.Element => {
		const [uploadedFiles, setUploadedFiles] = useState<IFile[] | null>(defaultValue ?? null);
		const [oldImageUrl, setOldImageUrl] = useState<string | undefined>();

		const onDrop = async (acceptedFiles: File[]): Promise<void> => {
			if (!acceptedFiles.length) {
				toast.error('Файл не подходит под требования');
				return;
			}

			if (isMultifile) {
				return await processMultiFile(acceptedFiles);
			}
			await processOneFile(acceptedFiles[0]);
		};

		const processOneFile = async (file: File): Promise<void> => {
			const fileIsValid = await validateFile(file, userValidateFile, sizes);
			if (!fileIsValid) {
				toast.error('Файл не прошел валидацию');
				return;
			}
			const isImage = file.type.includes('image');
			try {
				const response = (await uploadFile([file], isImage, oldImageUrl))[0];
				const uploadedFile = [{ ...response, isImage }];
				setUploadedFiles(uploadedFile);
				onUpload?.(uploadedFile);
			} catch (error) {
				if (error instanceof HTTPError) {
					toast.error('Произошла ошибка при загрузке файла: ' + error.message);
				}
			}
		};
		const processMultiFile = async (files: File[]): Promise<void> => {
			for (const file of files) {
				const fileIsValid = await validateFile(file, userValidateFile, sizes);
				if (!fileIsValid) {
					toast.error('Некоторые файлы не прошли валидацию');
					return;
				}
			}
			try {
				const response = await uploadFile(files);
				const newUploadedFiles = (uploadedFiles || []).concat(response.map((f) => ({ ...f, isImage: false })));
				setUploadedFiles(newUploadedFiles);
				onUpload?.(newUploadedFiles);
			} catch (error) {
				if (error instanceof HTTPError) {
					toast.error('Произошла ошибка при загрузке файла: ' + error.message);
				}
			}
		};

		const { getRootProps, getInputProps, isDragActive } = useDropzone({
			onDrop,
			accept: types
				? types.reduce<Accept>((acc, curr) => {
						acc[curr] = [];
						return acc;
					}, {})
				: undefined,
			multiple: isMultifile
		});

		const deleteUploadedFile = (file: IFile): void => {
			if (file.isImage) {
				setOldImageUrl(file.filename);
			}
			const newFileList = uploadedFiles?.filter((f) => f.filename !== file.filename) || null;
			setUploadedFiles(newFileList);
			onUpload?.(newFileList || []);
		};

		return (
			<div className={className} {...props}>
				<label className={styles['label']}>{label}</label>
				<div
					{...getRootProps()}
					className={classNames(className, styles['dropzone'], {
						[styles['isDragActive']]: isDragActive,
						[styles['fileIsLoad']]: uploadedFiles?.[0]?.isImage
					})}>
					{(!uploadedFiles || !uploadedFiles[0]?.isImage) && <input ref={ref} {...getInputProps()} />}
					{uploadedFiles?.[0]?.isImage ? (
						<>
							{!hideDeletion && (
								<button
									tabIndex={-1}
									onClick={() => deleteUploadedFile(uploadedFiles[0])}
									className={styles['trashButton']}
									type="button">
									<TrashIcon />
								</button>
							)}
							<img width={128} src={uploadedFiles[0]?.url} alt="Предпросмотр" />
						</>
					) : (
						<>{isDragActive ? <p>Отпустите файл здесь…</p> : <p>{placeholder || 'Прикрепите файл'}</p>}</>
					)}
				</div>
				{uploadedFiles &&
					uploadedFiles.some((f) => !f.isImage) &&
					uploadedFiles.map((f) => (
						<UploadedFile key={f.filename} file={f} deleteUploadedFile={!hideDeletion ? deleteUploadedFile : undefined} />
					))}
				{error && <p className={styles['error']}>{error}</p>}
			</div>
		);
	}
);
