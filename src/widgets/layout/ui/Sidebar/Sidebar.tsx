import type { JSX } from 'react';
import styles from './Sidebar.module.css';
import LogoIcon from '@/shared/assets/icons/logo.svg?react';
import { NavMenu, Actions } from '..';

export const Sidebar = (): JSX.Element => {
	return (
		<aside className={styles['sidebar']}>
			<LogoIcon className={styles['logo']} />
			<menu className={styles['menu']}>
				<NavMenu />
			</menu>
			<div className="separator" />
			<Actions className={styles['actions']} />
		</aside>
	);
};
