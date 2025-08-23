import type { AnchorHTMLAttributes, JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './DasbnoardTab.module.css';
import classNames from 'classnames';
import { Text, Title } from '@/shared/ui';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
	to: string;
	color: string;
	title: string;
	description: string;
	value?: number;
}

export const DashboardTab = ({ className, to, color, title, description, value, ...props }: Props): JSX.Element => {
	return (
		<Link {...props} to={to} style={{ ['--color' as any]: color }} className={classNames(className, styles['link'])}>
			<div className={styles['circle']}>
				<span>{value ?? ''}</span>
			</div>
			<div>
				<Title tag="h2">{title}</Title>
				<Text className={styles['description']} color="secondary" size="l">
					{description}
				</Text>
			</div>
		</Link>
	);
};
