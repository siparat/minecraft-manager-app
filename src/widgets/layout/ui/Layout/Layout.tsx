import type { JSX } from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '..';

export const Layout = (): JSX.Element => {
	return (
		<div className={styles['layout']}>
			<Sidebar />
			<main>
				<Outlet />
			</main>
		</div>
	);
};
