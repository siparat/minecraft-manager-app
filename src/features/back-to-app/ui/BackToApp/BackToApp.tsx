import { useAppStore } from '@/entities/app';
import { Routes } from '@/shared/config';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './BackToApp.module.css';
import ArrowIcon from '@/shared/assets/icons/arrow.svg?react';

export const BackToApp = (): JSX.Element => {
	const app = useAppStore((state) => state.app);

	if (!app) {
		return <></>;
	}

	return (
		<Link className={styles['link']} to={Routes.APP_PAGE.replace(':id', app.id.toString())}>
			<ArrowIcon className={styles['arrow']} />
			<p>{app.translations[0].name}</p>
		</Link>
	);
};
