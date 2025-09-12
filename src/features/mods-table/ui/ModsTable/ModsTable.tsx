import { useEffect, useState, useMemo, useCallback, type ChangeEvent, type JSX } from 'react';
import { MODS_PER_PAGE, useModsQuery } from '../../model';
import { DataGrid, type GridColDef, type GridFilterModel, type GridSortModel } from '@mui/x-data-grid';
import toast from 'react-hot-toast';
import styles from './ModsTable.module.css';
import { Root, Trigger } from '@radix-ui/react-dialog';
import { HTTPError } from 'ky';
import { ConfirmModal, Text } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import { deleteMod, useModStore, type Mod } from '@/entities/mod';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import debounce from 'lodash.debounce';
import { EditModModal } from '@/features/create-mod';

interface ModTableRow extends Omit<Mod, 'versions'> {
	id: number;
	name: string;
	versions: string[];
	logo: string;
	usedCount: number;
}

export const ModsTable = (): JSX.Element => {
	const unknownVersions = useModStore((state) => state.allVersions);
	const [versions, setVersions] = useState<string[]>();
	const [query, setQuery] = useState<string>();
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

	const handleNameFilterChange = useMemo(
		() =>
			debounce((applyValue: any, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				applyValue((prev: any) => ({ ...prev, value: e.target.value }));
			}, 350),
		[]
	);

	const columns: GridColDef<ModTableRow>[] = useMemo(
		() => [
			{
				field: 'name',
				resizable: false,
				headerName: 'Название',
				flex: 1,
				filterOperators: [
					{
						label: 'Поиск по названию',
						value: 'query',
						getApplyFilterFn: () => () => true,
						InputComponent: ({ item, applyValue }): JSX.Element => (
							<Input
								defaultValue={item.value || ''}
								placeholder="Название мода"
								onChange={(e) => handleNameFilterChange(applyValue, e)}
							/>
						)
					}
				],
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
				filterOperators: [
					{
						label: 'Содержит версию',
						value: 'containsVersion',
						getApplyFilterFn: () => () => true,
						InputComponent: ({ item, applyValue }) => (
							<Select
								value={item.value || ''}
								onChange={(e) => applyValue({ ...item, value: e.target.value })}
								displayEmpty
								fullWidth>
								<MenuItem value="">Все</MenuItem>
								{unknownVersions?.map(({ version }) => (
									<MenuItem key={version} value={version}>
										{version}
									</MenuItem>
								))}
							</Select>
						)
					}
				]
			},
			{
				field: 'logo',
				resizable: false,
				width: 100,
				sortable: false,
				filterable: false,
				headerName: 'Лого',
				renderCell: (params): JSX.Element => (
					<img
						style={{ height: '100%', width: '100%', objectFit: 'contain' }}
						width={50}
						height={50}
						src={params.value}
						alt="Логотип"
					/>
				)
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
				width: 300,
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
		[unknownVersions, deleteModById, handleNameFilterChange]
	);

	const onFilter = useCallback((model: GridFilterModel): void => {
		const searchValue: string | undefined = model.items.find((i) => i.field === 'name')?.value;
		setQuery(searchValue || undefined);

		const versions: string | undefined = model.items.find((i) => i.field === 'versions')?.value;
		setVersions(versions ? [versions] : undefined);
	}, []);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
	}, [error]);

	if (isError) return <p>Ошибка загрузки</p>;

	if (!data) return <p>Загрузка...</p>;

	return (
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
			onFilterModelChange={onFilter}
			loading={isLoading || !data}
			paginationModel={paginationModel}
			pageSizeOptions={[paginationModel.pageSize]}
			rowCount={data?.count}
			onPaginationModelChange={setPaginationModel}
			getRowId={(row) => row.id}
		/>
	);
};
