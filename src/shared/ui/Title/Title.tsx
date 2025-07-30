import classNames from 'classnames';
import { createElement, type HTMLAttributes, type JSX, type ReactNode } from 'react';
import styles from './Title.module.css';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
	tag: 'h1' | 'h2' | 'h3';
	children: ReactNode;
}

export const Title = ({ className, tag, children, ...props }: Props): JSX.Element => {
	return createElement(
		tag,
		{
			...props,
			className: classNames(className, styles['common'], styles[tag])
		},
		children
	);
};
