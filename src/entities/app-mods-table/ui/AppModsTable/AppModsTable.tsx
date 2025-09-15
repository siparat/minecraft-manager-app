import { type ChangeEvent, type Dispatch, type HTMLAttributes, type JSX, type SetStateAction } from 'react';
import { DataGrid, type DataGridProps, type GridColDef, type GridFilterModel, type GridSortModel } from '@mui/x-data-grid';
import toast from 'react-hot-toast';
import styles from './AppModsTable.module.css';
import { Routes } from '@/shared/config';
import { HTTPError } from 'ky';
import { Switch } from '@/shared/ui';
import { useModStore, type Mod, type ModQueryResponse } from '@/entities/mod';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import debounce from 'lodash.debounce';
import classNames from 'classnames';
import { useAppStore } from '@/entities/app';
import { toggleAppMod } from '../../api/toggle-app-mod';

interface ModTableRow extends Omit<Mod, 'versions'> {
	id: number;
	name: string;
	versions: string[];
	logo: string;
	isActived: boolean;
}

type Props = Required<Pick<DataGridProps, 'paginationModel' | 'onPaginationModelChange'>> &
	HTMLAttributes<HTMLDivElement> & {
		data: ModQueryResponse | undefined;
		setVersions: Dispatch<SetStateAction<string[] | undefined>>;
		setQuery: Dispatch<SetStateAction<string | undefined>>;
		setSort: Dispatch<SetStateAction<GridSortModel | undefined>>;
		updateModValue: (modId: number, value: boolean) => void;
	};

export const AppModsTable = ({
	className,
	data,
	updateModValue,
	setVersions,
	setQuery,
	paginationModel,
	onPaginationModelChange,
	setSort,
	...props
}: Props): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const unknownVersions = useModStore((state) => state.allVersions);

	const onToggleMod = async (modId: number, value: boolean): Promise<void> => {
		if (!app) {
			return;
		}

		const toastId = toast.loading('Загрузка...');
		try {
			await toggleAppMod(app.id, modId);
			toast.success(`Мод был успешно ${value ? 'добавлен' : 'убран'}`, { id: toastId });
			updateModValue(modId, value);
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message, { id: toastId });
			}
		}
	};

	const columns: GridColDef<ModTableRow>[] = [
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
					InputComponent: ({ item, applyValue }): JSX.Element => {
						const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
							applyValue({ ...item, value: e.target.value });
						};

						return <Input defaultValue={item.value || ''} placeholder="Название мода" onChange={debounce(onChange, 350)} />;
					}
				}
			],
			renderCell: (params): JSX.Element => (
				<a className={styles['link']} href={Routes.MOD_PAGE.replace(':id', params.id.toString())}>
					{params.value}
				</a>
			)
		},
		{
			field: 'versions',
			sortable: false,
			resizable: true,
			headerName: 'Совместимые версии',
			flex: 1,
			renderCell: ({ value }) => value.join(', '),
			filterOperators: [
				{
					label: 'Содержит версию',
					value: 'containsVersion',
					getApplyFilterFn: () => () => true,
					InputComponent: ({ item, applyValue }) => (
						<Select
							className={styles['select']}
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
			renderCell(params): JSX.Element {
				return (
					<img
						style={{ height: '100%', width: '100%', objectFit: 'contain' }}
						width={50}
						height={50}
						src={params.value}
						alt="Логотип"
					/>
				);
			}
		},
		{
			field: 'actions',
			resizable: false,
			headerName: 'Действия',
			type: 'actions',
			sortable: false,
			filterable: false,
			width: 300,
			renderCell: (params): JSX.Element => <Switch value={params.row.isActived} onSwitch={(value) => onToggleMod(params.row.id, value)} />
		}
	];

	const onFilter = (model: GridFilterModel): void => {
		const searchValue: string | undefined = model.items.find((i) => i.field == 'name')?.value;
		setQuery(searchValue || undefined);

		const versions: string | undefined = model.items.find((i) => i.field == 'versions')?.value;
		setVersions(versions ? [versions] : undefined);
	};

	if (!data) return <p>Загрузка...</p>;

	return (
		<DataGrid
			className={classNames(className, styles['table'])}
			rows={data?.mods.map((mod) => ({
				...mod,
				id: mod.id,
				name: mod.title,
				versions: mod.versions.map(({ version }) => version),
				logo: mod.image,
				isActived: mod.apps!.some(({ id }) => app?.id == id)
			}))}
			columns={columns}
			paginationMode="server"
			sortingMode="server"
			filterMode="server"
			onSortModelChange={setSort}
			onFilterModelChange={onFilter}
			paginationModel={paginationModel}
			onPaginationModelChange={onPaginationModelChange}
			pageSizeOptions={[paginationModel.pageSize]}
			rowCount={data?.count}
			getRowId={(row) => row.id}
			{...props}
		/>
	);
};
