import { useAppStore } from '@/entities/app';
import { BackToApp } from '@/features/back-to-app';
import { NewIssuesList, SolvedIssuesList } from '@/widgets/issues-list';
import { type JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './AppIssuesPage.module.css';

export const AppIssuesPage = (): JSX.Element => {
	const app = useAppStore((state) => state.app);

	if (!app) {
		return <></>;
	}

	return (
		<div className={styles['page']}>
			<Helmet>
				<title>Жалобы приложения {app.translations[0].name}</title>
			</Helmet>
			<BackToApp />
			<NewIssuesList className={styles['newList']} />
			<SolvedIssuesList className={styles['solvedList']} />
		</div>
	);
};
