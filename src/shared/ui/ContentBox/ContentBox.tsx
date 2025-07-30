import type { HTMLAttributes, JSX, ReactNode } from 'react';
import styles from './ContentBox.module.css';
import classNames from 'classnames';
import { Title } from '../Title';

interface Props extends HTMLAttributes<HTMLDivElement> {
	title: string;
	children: ReactNode;
}

export const ContentBox = ({ className, title, children, ...props }: Props): JSX.Element => {
	return (
		<div {...props} className={classNames(className, styles['box'])}>
			<Title className={styles['title']} tag="h3">
				{title}
			</Title>
			{children}
		</div>
	);
};
