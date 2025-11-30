import type { HTMLAttributes, JSX } from 'react';
import { usePolicyStore, type Policy } from '../../model';
import styles from './PolicyCard.module.css';
import classNames from 'classnames';
import { ConfirmModal, Text, Title } from '@/shared/ui';
import PencilIcon from '@/shared/assets/icons/pencil.svg?react';
import EyeIcon from '@/shared/assets/icons/eye.svg?react';
import TrashIcon from '@/shared/assets/icons/trash.svg?react';
import { Root, Trigger } from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';
import { deletePolicy } from '../../api';
import { HTTPError } from 'ky';
import { Link } from 'react-router-dom';
import { Routes } from '@/shared/config';

interface Props extends HTMLAttributes<HTMLDivElement> {
	data: Omit<Policy, 'content'>;
}

export const PolicyCard = ({ data, className, ...props }: Props): JSX.Element => {
	const { policies, setPolicies } = usePolicyStore();

	const onDelete = async (): Promise<void> => {
		const toastId = toast.loading(`Удаление политики ${data.slug}`);
		try {
			await deletePolicy(data.slug);
			setPolicies(policies.filter((p) => p.slug !== data.slug) as Policy[]);
			toast.success(`Политика ${data.slug} успешно удалена`, { id: toastId });
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error('Произошла ошибка: ' + error.message, { id: toastId });
			}
		}
	};

	return (
		<div {...props} className={classNames(className, styles['card'])}>
			<div className={styles['content']}>
				<Text color="secondary" size="l">
					{data.slug}
				</Text>
				<Title tag="h2">{data.title}</Title>
			</div>
			<div className={styles['actions']}>
				<Link to={Routes.EDIT_POLICY.replace(':slug', data.slug)} className={styles['blue']}>
					<PencilIcon />
				</Link>
				<Link to={Routes.POLICY_CONTENT.replace(':slug', data.slug)} className={styles['green']}>
					<EyeIcon />
				</Link>
				<Root>
					<Trigger asChild>
						<button className={styles['red']}>
							<TrashIcon style={{ stroke: '#fff' }} />
						</button>
					</Trigger>
					<ConfirmModal callback={onDelete}>
						<>
							<Text>
								Вы действительно хотите удалить политику <b>{data.title}</b>?
							</Text>
						</>
					</ConfirmModal>
				</Root>
			</div>
		</div>
	);
};
