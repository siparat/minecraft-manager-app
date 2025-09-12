import { useEffect, useState, type JSX } from 'react';
import { useAppModsQuery } from '../../model';
import { type GridSortModel } from '@mui/x-data-grid';
import styles from './ActiveAppModsTable.module.css';
import { Title } from '@/shared/ui';
import { AppModsTable } from '@/entities/app-mods-table';
import toast from 'react-hot-toast';
import { MODS_PER_PAGE } from '@/features/mods-table/model';
import { useAppStore } from '@/entities/app';
import { useQueryClient } from '@tanstack/react-query';
import type { ModQueryResponse } from '@/entities/mod';

export const ActiveAppModsTable = (): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const [versions, setVersions] = useState<string[]>();
	const [query, setQuery] = useState<string>();
	const [sort, setSort] = useState<GridSortModel>();
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: MODS_PER_PAGE
	});
	const { error, data } = useAppModsQuery(
		app?.id || NaN,
		true,
		paginationModel.pageSize,
		paginationModel.pageSize * paginationModel.page,
		query,
		versions,
		sort?.[0]
	);
	const queryClient = useQueryClient();

	const updateModValue = (modId: number, value: boolean): void => {
		queryClient.setQueryData(
			[
				'appMods',
				app?.id || NaN,
				true,
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
			<Title tag="h1">Активные моды</Title>
			<AppModsTable
				updateModValue={updateModValue}
				data={data}
				className={styles['table']}
				setVersions={setVersions}
				setSort={setSort}
				paginationModel={paginationModel}
				onPaginationModelChange={setPaginationModel}
				setQuery={setQuery}
			/>
		</div>
	);
};
