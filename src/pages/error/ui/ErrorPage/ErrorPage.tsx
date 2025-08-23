import { Title } from '@/shared/ui';
import type { HTTPError } from 'ky';
import type { JSX } from 'react';
import { useRouteError } from 'react-router-dom';
import styles from './ErrorPage.module.css';
import { Helmet } from 'react-helmet-async';

export const ErrorPage = (): JSX.Element => {
	const error = useRouteError() as Error | HTTPError;

	return (
		<>
			<Helmet>
				<title>{error.message}</title>
			</Helmet>
			<Title className={styles['text']} tag="h1">
				{error.message}
			</Title>
		</>
	);
};
