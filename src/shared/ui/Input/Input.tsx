import classNames from 'classnames';
import { forwardRef, useId, type ForwardedRef, type HTMLInputTypeAttribute, type InputHTMLAttributes, type JSX } from 'react';
import styles from './Input.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	fieldsetClassName?: string;
	label?: string;
	type?: Extract<HTMLInputTypeAttribute, 'email' | 'number' | 'password' | 'text'>;
	error?: string;
}

export const Input = forwardRef(
	({ type = 'text', error, label, fieldsetClassName, className, ...props }: Props, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
		const id = useId();

		return (
			<fieldset className={fieldsetClassName}>
				{label && (
					<label className={styles['label']} htmlFor={id}>
						{label}
					</label>
				)}
				<input ref={ref} {...props} className={classNames(className, styles['input'])} id={id} type={type} />
				{error && <p className={styles['error']}>{error}</p>}
			</fieldset>
		);
	}
);
