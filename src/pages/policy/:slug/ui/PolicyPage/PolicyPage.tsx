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
		<div className={styles['page']}>
			<Helmet>
				<title>{title}</title>
			</Helmet>

			<div className={styles['book']}>
				<div className={styles['bookInner']}>
					<h1 className={styles['bookTitle']}>{title}</h1>
					<div className={styles['bookDivider']} />
					{slug.includes('.') ? (
						<pre className={styles['bookContent']}>{content}</pre>
					) : (
						<article className={styles['bookContent']}>{parse(content)}</article>
					)}
				</div>
			</div>
		</div>
	);
};
