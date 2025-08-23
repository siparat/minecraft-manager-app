import { AppIssueStatus, useAppStore } from '@/entities/app';
import { Title } from '@/shared/ui';
import { useMemo, type HTMLAttributes, type JSX } from 'react';
import styles from '../NewIssuesList/NewIssuesList.module.css';
import { IssueItem } from '@/entities/issue';
import classNames from 'classnames';

export const SolvedIssuesList = ({ className, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element => {
	const issues = useAppStore((state) => state.issues);

	const newIssues = useMemo(() => issues.filter((i) => i.status == AppIssueStatus.SOLVED), [issues]);

	return (
		<div {...props} className={classNames(className, styles['wrapper'])}>
			<div className={styles['title']}>
				<Title tag="h1">Решенные жалобы</Title>
				<span className={styles['solvedCounts']}>{newIssues.length}</span>
			</div>
			{newIssues.map((i) => (
				<IssueItem className={styles['issue']} key={i.id} issue={i} />
			))}
		</div>
	);
};
