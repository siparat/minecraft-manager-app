import { useEffect, useState, useMemo, useCallback, type JSX } from 'react';
import { MODS_PER_PAGE, useModsQuery, useModsTableFilters } from '../../model';
import { DataGrid, type GridColDef, type GridSortModel } from '@mui/x-data-grid';
import toast from 'react-hot-toast';
import styles from './ModsTable.module.css';
import { Root, Trigger } from '@radix-ui/react-dialog';
import { HTTPError } from 'ky';
import { ConfirmModal, Text } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import { deleteMod, ModCategoryLabels, type Mod } from '@/entities/mod';
import { EditModModal } from '@/features/create-mod';
import { ModCategory } from 'minecraft-manager-schemas';
import { ModsTableFilters } from '../ModsTableFilters/ModsTableFilters';

interface ModTableRow extends Omit<Mod, 'versions'> {
	id: number;
	name: string;
	versions: string[];
	category: ModCategory;
	logo: string;
	usedCount: number;
}

export const ModsTable = (): JSX.Element => {
	const filters = useModsTableFilters();
	const { query, versions, commentsCount, rating, commentsCountOperator, ratingOperator, category } = filters;
	const [sort, setSort] = useState<GridSortModel>();
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: MODS_PER_PAGE
	});
	const { error, isLoading, data, isError } = useModsQuery(
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
	const navigate = useNavigate();

	const deleteModById = useCallback(
		async (modId: number): Promise<void> => {
			try {
				await deleteMod(modId);
				navigate(0);
			} catch (error) {
				if (error instanceof HTTPError) {
					toast.error(error.message);
				}
			}
		},
		[navigate]
	);

	const columns: GridColDef<ModTableRow>[] = useMemo(
		() => [
			{
				field: 'name',
				resizable: false,
				headerName: 'Название',
				flex: 1,
				filterable: false,
				renderCell: (params): JSX.Element =>
					params.row.isParsed ? (
						<a
							target="_blank"
							rel="noreferrer"
							className={styles['link']}
							href={import.meta.env.VITE_MODS_HOST + '/' + params.row.parsedSlug}>
							{params.value}
						</a>
					) : (
						<p>{params.value}</p>
					)
			},
			{
				field: 'versions',
				sortable: false,
				resizable: true,
				headerName: 'Совместимые версии',
				flex: 1,
				renderCell: ({ value }) => <p title={value}>{value.join(', ')}</p>,
				filterable: false
			},
			{
				field: 'category',
				resizable: false,
				width: 120,
				sortable: false,
				filterable: false,
				headerName: 'Категория',
				renderCell: ({ value }): string => ModCategoryLabels[value as ModCategory]
			},
			{
				field: 'logo',
				resizable: false,
				width: 100,
				sortable: false,
				filterable: false,
				headerName: 'Лого',
				renderCell: (params): JSX.Element => (
					<a target="_blank" href={params.value}>
						<img
							style={{ height: '100%', width: '100%', objectFit: 'contain' }}
							width={50}
							height={50}
							src={params.value}
							alt="Логотип"
						/>
					</a>
				)
			},
			{
				field: 'rating',
				resizable: false,
				filterable: false,
				type: 'number',
				headerName: 'Оценка',
				width: 110
			},
			{
				field: 'commentCounts',
				resizable: false,
				filterable: false,
				type: 'number',
				headerName: 'Комментариев',
				width: 180
			},
			{
				field: 'usedCount',
				resizable: false,
				filterable: false,
				type: 'number',
				headerName: 'Используется раз',
				width: 200
			},
			{
				field: 'actions',
				resizable: false,
				headerName: 'Действия',
				type: 'actions',
				sortable: false,
				filterable: false,
				width: 200,
				renderCell: (params): JSX.Element => (
					<div className={styles['actions']}>
						<Root>
							<Trigger asChild>
								<button title="Редактировать">✏️</button>
							</Trigger>
							<EditModModal
								modData={{
									...params.row,
									versions: params.row.versions.map((version) => ({ version }))
								}}
							/>
						</Root>
						<Root>
							<Trigger asChild>
								<button title="Удалить">🗑️</button>
							</Trigger>
							<ConfirmModal callback={() => deleteModById(params.row.id)}>
								<Text>
									Вы действительно хотите удалить приложение <b>{params.row.name}</b>?
								</Text>
							</ConfirmModal>
						</Root>
					</div>
				)
			}
		],
		[deleteModById]
	);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
	}, [error]);

	if (isError) return <p>Ошибка загрузки</p>;

	if (!data) return <p>Загрузка...</p>;

	return (
		<>
			<ModsTableFilters filters={filters} />
			<DataGrid
				className={styles['table']}
				rows={data?.mods.map((mod) => ({
					...mod,
					id: mod.id,
					name: mod.title,
					versions: mod.versions.map(({ version }) => version),
					logo: mod.image,
					usedCount: mod._count.apps
				}))}
				columns={columns}
				paginationMode="server"
				sortingMode="server"
				filterMode="server"
				onSortModelChange={setSort}
				loading={isLoading || !data}
				paginationModel={paginationModel}
				pageSizeOptions={[paginationModel.pageSize]}
				rowCount={data?.count}
				onPaginationModelChange={setPaginationModel}
				getRowId={(row) => row.id}
			/>
		</>
	);
};
