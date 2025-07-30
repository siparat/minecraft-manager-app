import type { JSX } from 'react';
import styles from './AuthPage.module.css';
import { ContentBox } from '@/shared/ui';
import { AuthorizationForm } from '@/features/auth';

export const AuthPage = (): JSX.Element => {
	return (
		<div className={styles['page']}>
			<ContentBox className={styles['box']} title="Авторизация">
				<AuthorizationForm />
			</ContentBox>
		</div>
	);
};
