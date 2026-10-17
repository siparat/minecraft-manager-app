import type { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
import parse from 'html-react-parser';
import type { Policy } from '@/entities/policy';
import styles from './PolicyPage.module.css';

export const PolicyPage = (): JSX.Element => {
	const { policy } = useLoaderData<{ policy: Policy }>();

	return (
		<div className={styles.page}>
			<Helmet><title>{policy.title} — Minecraft Manager</title></Helmet>
			<div className={styles.orb} aria-hidden="true" />
			<header className={styles.header}>
			</header>
			<main className={styles.shell}>
				<h1>{policy.title}</h1>
				<div className={styles.divider} />
				<article className={styles.content}>{policy.slug.includes('.') ? <pre>{policy.content}</pre> : parse(policy.content)}</article>
			</main>
		</div>
	);
};
