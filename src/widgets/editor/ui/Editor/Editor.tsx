import { type Dispatch, type JSX, type SetStateAction } from 'react';
import ReactQuill, { type ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { EDITOR_MODULES } from '../../model';

interface Props extends ReactQuillProps {
	value: string;
	onChange: Dispatch<SetStateAction<string>> | ((value: string) => void);
}

export const Editor = ({ value, onChange, ...props }: Props): JSX.Element => {
	return <ReactQuill {...props} value={value} onChange={onChange} modules={EDITOR_MODULES} theme="snow" />;
};
