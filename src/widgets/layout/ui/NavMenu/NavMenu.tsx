import { Menu } from '@/shared/config';
import type { JSX } from 'react';
import styles from './NavMenu.module.css';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const NavMenu = (): JSX.Element => {
	return (
		<nav className={styles['nav']}>
			<ul className={styles['list']}>
				{Menu.map((el) => (
					<li key={el.path}>
						<NavLink className={({ isActive }) => classNames(styles['link'], { [styles['active']]: isActive })} to={el.path}>
							{el.icon}
							<p>{el.label}</p>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};
