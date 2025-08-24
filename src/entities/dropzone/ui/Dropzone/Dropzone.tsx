import { type JSX, useState, type HTMLAttributes, type MouseEvent, forwardRef, type ForwardedRef } from 'react';
import { useDropzone, type Accept } from 'react-dropzone';
import { validateFile } from '../../lib';
import classNames from 'classnames';
import styles from './Dropzone.module.css';
import TrashIcon from '@/shared/assets/icons/trash.svg?react';
import ClipIcon from '@/shared/assets/icons/clip.svg?react';
import toast from 'react-hot-toast';
import { type IFile, type UploadedFileResponse } from '../../';
import { HTTPError } from 'ky';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
	sizes?: [number, number];
	types?: string[];
	error?: string;
	label: string;
	defaultValue?: IFile;
	validateFile?: (file: File) => boolean;
	placeholder?: string;
	hideDeletion?: boolean;
	uploadFile: (file: File, isImage?: boolean, oldFilename?: string) => Promise<UploadedFileResponse>;
	onChange?: (file: string | null) => void;
}

export const Dropzone = forwardRef(
	(
		{
			className,
			error,
			uploadFile,
			onChange,
			placeholder,
			defaultValue,
			validateFile: userValidateFile,
			label,
			sizes,
			hideDeletion,
			types,
			...props
		}: Props,
		ref: ForwardedRef<HTMLInputElement>
	): JSX.Element => {
		const [uploadedFile, setUploadedFile] = useState<IFile | null>(defaultValue || null);
		const [oldImageUrl, setOldImageUrl] = useState<string | undefined>();

		const onDrop = async (acceptedFiles: File[]): Promise<void> => {
			const file = acceptedFiles[0];
			if (!file) {
				toast.error('Файл не подходит под требования');
				return;
			}
			const fileIsValid = await validateFile(file, userValidateFile, sizes);
			if (!fileIsValid) {
				toast.error('Файл не прошел валидацию');
				return;
			}
			const isImage = file.type.includes('image');
			try {
				const response = await uploadFile(file, isImage, oldImageUrl);
				const uploadedFile = { ...response, isImage };
				setUploadedFile(uploadedFile);
				onChange?.(uploadedFile.url);
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
			multiple: false
		});

		const deleteUploadedFile = (e: MouseEvent): void => {
			e.stopPropagation();
			setOldImageUrl(uploadedFile?.filename);
			setUploadedFile(null);
			onChange?.(null);
		};

		return (
			<div className={className} {...props}>
				<label className={styles['label']}>{label}</label>
				<div
					{...getRootProps()}
					className={classNames(className, styles['dropzone'], {
						[styles['isDragActive']]: isDragActive,
						[styles['fileIsLoad']]: uploadedFile?.isImage
					})}>
					{(!uploadedFile || !uploadedFile.isImage) && <input ref={ref} {...getInputProps()} />}
					{uploadedFile?.isImage ? (
						<>
							{!hideDeletion && (
								<button tabIndex={-1} onClick={deleteUploadedFile} className={styles['trashButton']} type="button">
									<TrashIcon />
								</button>
							)}
							<img width={128} src={uploadedFile.url} alt="Предпросмотр" />
						</>
					) : (
						<>{isDragActive ? <p>Отпустите файл здесь…</p> : <p>{placeholder || 'Прикрепите файл'}</p>}</>
					)}
				</div>
				{uploadedFile && !uploadedFile.isImage && (
					<div className={styles['uploadedFileString']}>
						<ClipIcon />
						<a target="_blank" href={uploadedFile.url}>
							<p>{uploadedFile.filename}</p>
						</a>
						{!hideDeletion && (
							<button tabIndex={-1} onClick={deleteUploadedFile} type="button">
								<TrashIcon />
							</button>
						)}
					</div>
				)}
				{error && <p className={styles['error']}>{error}</p>}
			</div>
		);
	}
);
