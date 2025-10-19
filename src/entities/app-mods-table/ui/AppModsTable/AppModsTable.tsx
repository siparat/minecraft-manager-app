import { type Dispatch, type HTMLAttributes, type JSX, type SetStateAction } from 'react';
import { DataGrid, type DataGridProps, type GridColDef, type GridSortModel } from '@mui/x-data-grid';
import toast from 'react-hot-toast';
import styles from './AppModsTable.module.css';
import { HTTPError } from 'ky';
import { Switch } from '@/shared/ui';
import { ModCategoryLabels, type Mod, type ModQueryResponse } from '@/entities/mod';
import classNames from 'classnames';
import { useAppStore } from '@/entities/app';
import { toggleAppMod } from '../../api/toggle-app-mod';
import type { ModCategory } from 'minecraft-manager-schemas';
import { EditModModal } from '@/features/create-mod';
import { Root, Trigger } from '@radix-ui/react-dialog';

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
		setSort: Dispatch<SetStateAction<GridSortModel | undefined>>;
		updateModValue: (modId: number, value: boolean) => void;
	};

export const AppModsTable = ({
	className,
	data,
	updateModValue,
	paginationModel,
	onPaginationModelChange,
	setSort,
	...props
}: Props): JSX.Element => {
	const app = useAppStore((state) => state.app);

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
			filterable: false,
			renderCell: (params): JSX.Element => (
				<a target="_blank" className={styles['link']} href={import.meta.env.VITE_MODS_HOST + '/' + params.row.parsedSlug}>
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
			renderCell(params): JSX.Element {
				return (
					<a target="_blank" href={params.value}>
						<img
							style={{ height: '100%', width: '100%', objectFit: 'contain' }}
							width={50}
							height={50}
							src={params.value}
							alt="Логотип"
						/>
					</a>
				);
			}
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
							reloadPage={false}
							modData={{
								...params.row,
								versions: params.row.versions.map((version) => ({ version }))
							}}
						/>
					</Root>
					<Switch value={params.row.isActived} onSwitch={(value) => onToggleMod(params.row.id, value)} />
				</div>
			)
		}
	];

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
			paginationModel={paginationModel}
			onPaginationModelChange={onPaginationModelChange}
			pageSizeOptions={[paginationModel.pageSize]}
			rowCount={data?.count}
			getRowId={(row) => row.id}
			{...props}
		/>
	);
};
