import classNames from 'classnames';
import { forwardRef, useId, type ForwardedRef, type JSX, type TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.css';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	fieldsetClassName?: string;
	label?: string;
	error?: string;
}

export const Textarea = forwardRef(
	({ error, label, fieldsetClassName, className, ...props }: Props, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
		const id = useId();

		return (
			<fieldset className={fieldsetClassName}>
				{label && (
					<label className={styles['label']} htmlFor={id}>
						{label}
					</label>
				)}
				<textarea ref={ref} {...props} className={classNames(className, styles['textarea'])} id={id} />
				{error && <p className={styles['error']}>{error}</p>}
			</fieldset>
		);
	}
);
