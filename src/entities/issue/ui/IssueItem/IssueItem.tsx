import { AppIssueStatus, useAppStore, type AppIssue } from '@/entities/app';
import classNames from 'classnames';
import type { HTMLAttributes, JSX } from 'react';
import styles from './IssueItem.module.css';
import { Text } from '@/shared/ui';
import dayjs from 'dayjs';
import TickIcon from '@/shared/assets/icons/tick.svg?react';
import TrashIcon from '@/shared/assets/icons/trash.svg?react';
import toast from 'react-hot-toast';
import { HTTPError } from 'ky';
import { deleteAppIssue, solveAppIssue } from '../..';

interface Props extends HTMLAttributes<HTMLDivElement> {
	issue: AppIssue;
}

export const IssueItem = ({ className, issue, ...props }: Props): JSX.Element => {
	const refetchIssues = useAppStore((state) => state.refetchIssues);

	const solveIssue = async (): Promise<void> => {
		const toastId = toast.loading('Загрузка...');
		try {
			await solveAppIssue(issue.appId, issue.id);
			toast.success('Жалоба отмечена как решённая', { id: toastId });
			await refetchIssues();
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message, { id: toastId });
			}
		}
	};

	const deleteIssue = async (): Promise<void> => {
		const toastId = toast.loading('Загрузка...');
		try {
			await deleteAppIssue(issue.appId, issue.id);
			toast.success('Жалоба была удалена', { id: toastId });
			await refetchIssues();
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message, { id: toastId });
			}
		}
	};

	return (
		<div {...props} className={classNames(className, styles['issue'])}>
			<div className={styles['info']}>
				<Text color="secondary" size="m">
					{dayjs(issue.createdAt).format('DD.MM.YYYY HH:mm')}
				</Text>
				<Text className={styles['email']} color="primary" size="l">
					{issue.email}
				</Text>
				<Text className={styles['text']} color="primary" size="l">
					{issue.text}
				</Text>
			</div>
			<div className={styles['actions']}>
				<button title="Удалить запись" onClick={deleteIssue} className={styles['deleteButton']}>
					<TrashIcon />
				</button>
				{issue.status == AppIssueStatus.CREATED && (
					<button title="Отметь как решённое" onClick={solveIssue} className={styles['solveButton']}>
						<TickIcon />
					</button>
				)}
			</div>
		</div>
	);
};
