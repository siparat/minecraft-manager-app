import { PolicyCard, usePolicyStore } from '@/entities/policy';
import { Title } from '@/shared/ui';
import type { JSX } from 'react';
import styles from './PoliciesList.module.css';
import { Link } from 'react-router-dom';
import { Routes } from '@/shared/config';

export const PoliciesList = (): JSX.Element => {
	const policies = usePolicyStore((state) => state.policies);

	return (
		<section>
			<div className={styles['titleWrapper']}>
				<Title tag="h1">Список политик</Title>
				<span>{policies.length}</span>
				<Link to={Routes.CREATE_POLICY}>
					<span style={{ background: '#09C269' }}>+</span>
				</Link>
			</div>

			<div className={styles['list']}>
				{policies.map((p) => (
					<PolicyCard key={p.id} data={p} />
				))}
			</div>
		</section>
	);
};
