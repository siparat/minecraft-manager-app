import { ModsTable } from '@/features/mods-table';
import { Title } from '@/shared/ui';
import type { JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ModsPage.module.css';
import { CreateModButton, CreateModModal } from '@/features/create-mod/ui';
import { Root, Trigger } from '@radix-ui/react-dialog';

export const ModsPage = (): JSX.Element => {
	return (
		<>
			<Helmet>
				<title>Моды</title>
			</Helmet>
			<div className={styles['wrapperTitle']}>
				<Title tag="h1">Моды</Title>
				<Root>
					<Trigger>
						<CreateModButton />
					</Trigger>
					<CreateModModal />
				</Root>
			</div>
			<ModsTable />
		</>
	);
};
