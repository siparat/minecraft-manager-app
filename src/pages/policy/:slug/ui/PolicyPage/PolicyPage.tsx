import type { Policy } from '@/entities/policy';
import type { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import parse from 'html-react-parser';
import styles from './PolicyPage.module.css';
import 'quill/dist/quill.bubble.css';

export const PolicyPage = (): JSX.Element => {
	const {
		policy: { slug, title, content }
	} = useLoaderData<{ policy: Policy }>();

	return (
		<>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			{slug.includes('.') ? (
				<pre className={styles['article']}>{content}</pre>
			) : (
				<article className={styles['article']}>{parse(content)}</article>
			)}
		</>
	);
};
