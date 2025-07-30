import classNames from 'classnames';
import type { ButtonHTMLAttributes, JSX, ReactNode } from 'react';
import styles from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	appearance?: 'primary' | 'ghost';
}

export const Button = ({ className, appearance = 'primary', children, ...props }: Props): JSX.Element => {
	return (
		<button {...props} className={classNames(className, styles['button'], styles[appearance])}>
			{children}
		</button>
	);
};
