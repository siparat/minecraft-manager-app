import type { HTMLAttributes, JSX, ReactNode } from 'react';
import styles from './Text.module.css';
import classNames from 'classnames';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode;
	color?: 'primary' | 'secondary' | 'red' | 'white';
	size?: 'l' | 'm' | 's' | 'xs';
}

export const Text = ({ children, className, color = 'primary', size = 'm', ...props }: Props): JSX.Element => {
	return (
		<p {...props} className={classNames(className, styles[color], styles[size])}>
			{children}
		</p>
	);
};
