import { type JSX, useState, type HTMLAttributes, type MouseEvent } from 'react';
import { useDropzone, type Accept } from 'react-dropzone';
import { validateFile } from '../../lib';
import classNames from 'classnames';
import styles from './Dropzone.module.css';
import TrashIcon from '@/shared/assets/icons/trash.svg?react';
import ClipIcon from '@/shared/assets/icons/clip.svg?react';
import toast from 'react-hot-toast';
import { uploadFile, type IFile } from '../../';
import { HTTPError } from 'ky';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
	sizes?: [number, number];
	types?: string[];
	error?: string;
	label: string;
	validateFile?: (file: File) => boolean;
	placeholder?: string;
	onChange?: (file: string | null) => void;
}

export const Dropzone = ({
	className,
	error,
	onChange,
	placeholder,
	validateFile: userValidateFile,
	label,
	sizes,
	types,
	...props
}: Props): JSX.Element => {
	const [uploadedFile, setUploadedFile] = useState<IFile | null>(null);
	const [oldImageUrl, setOldImageUrl] = useState<string | undefined>();

	const onDrop = async (acceptedFiles: File[]): Promise<void> => {
		setUploadedFile(null);
		const file = acceptedFiles[0];
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
				{(!uploadedFile || !uploadedFile.isImage) && <input {...getInputProps()} />}
				{uploadedFile?.isImage ? (
					<>
						<button tabIndex={-1} onClick={deleteUploadedFile} className={styles['trashButton']} type="button">
							<TrashIcon />
						</button>
						<img width={128} src={'http://localhost:3000' + uploadedFile.url} alt="Предпросмотр" />
					</>
				) : (
					<>{isDragActive ? <p>Отпустите файл здесь…</p> : <p>{placeholder || 'Прикрепите файл'}</p>}</>
				)}
			</div>
			{uploadedFile && !uploadedFile.isImage && (
				<div className={styles['uploadedFileString']}>
					<ClipIcon />
					<p>{uploadedFile.filename}</p>
					<button tabIndex={-1} onClick={deleteUploadedFile} type="button">
						<TrashIcon />
					</button>
				</div>
			)}
			{error && <p className={styles['error']}>{error}</p>}
		</div>
	);
};
