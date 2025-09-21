import { useEffect, useState, type JSX } from 'react';
import { useAppModsQuery } from '../../model';
import { type GridSortModel } from '@mui/x-data-grid';
import styles from './InactiveAppModsTable.module.css';
import { Title } from '@/shared/ui';
import { AppModsTable } from '@/entities/app-mods-table';
import toast from 'react-hot-toast';
import { MODS_PER_PAGE, useModsTableFilters } from '@/features/mods-table/model';
import { useAppStore } from '@/entities/app';
import type { ModQueryResponse } from '@/entities/mod';
import { useQueryClient } from '@tanstack/react-query';
import { ModsTableFilters } from '@/features/mods-table/ui/ModsTableFilters/ModsTableFilters';

export const InactiveAppModsTable = (): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const filters = useModsTableFilters();
	const { query, versions, commentsCount, rating, commentsCountOperator, ratingOperator, category } = filters;
	const [sort, setSort] = useState<GridSortModel>();
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: MODS_PER_PAGE
	});
	const { error, data } = useAppModsQuery(
		app?.id || NaN,
		false,
		paginationModel.pageSize,
		paginationModel.pageSize * paginationModel.page,
		query,
		versions,
		commentsCount,
		rating,
		commentsCountOperator,
		ratingOperator,
		category,
		sort?.[0]
	);
	const queryClient = useQueryClient();

	const updateModValue = (modId: number, value: boolean): void => {
		queryClient.setQueryData(
			[
				'appMods',
				app?.id || NaN,
				false,
				paginationModel.pageSize,
				paginationModel.pageSize * paginationModel.page,
				query,
				versions,
				sort?.[0]
			],
			({ count, mods }: ModQueryResponse): ModQueryResponse => ({
				count,
				mods: mods.map((m) => (m.id !== modId ? m : { ...m, apps: value ? [{ id: app!.id }] : [] }))
			})
		);
	};

	useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
	}, [error]);

	return (
		<div className={styles['block']}>
			<Title tag="h1">Неактивные моды</Title>
			<ModsTableFilters filters={filters} />
			<AppModsTable
				updateModValue={updateModValue}
				data={data}
				className={styles['table']}
				setSort={setSort}
				paginationModel={paginationModel}
				onPaginationModelChange={setPaginationModel}
			/>
		</div>
	);
};
