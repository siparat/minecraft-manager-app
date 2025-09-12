import type { JSX } from 'react';
import styles from './UploadedFile.module.css';
import ClipIcon from '@/shared/assets/icons/clip.svg?react';
import TrashIcon from '@/shared/assets/icons/trash.svg?react';
import type { IFile } from '../../model';

interface Props {
	file: IFile;
	deleteUploadedFile?: (f: IFile) => unknown;
}

export const UploadedFile = ({ file, deleteUploadedFile }: Props): JSX.Element => {
	return (
		<div key={file.filename} className={styles['uploadedFileString']}>
			<ClipIcon />
			<a target="_blank" href={file.url}>
				<p>{file.filename}</p>
			</a>
			{deleteUploadedFile && (
				<button tabIndex={-1} onClick={() => deleteUploadedFile(file)} type="button">
					<TrashIcon />
				</button>
			)}
		</div>
	);
};
