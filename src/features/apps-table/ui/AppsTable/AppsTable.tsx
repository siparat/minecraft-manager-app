import { useEffect, useState, type JSX } from 'react';
import { useAllAppsQuery } from '../../model';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { AppStatus, AppStatusLabels, deleteApp, getApp, type App } from '@/entities/app';
import toast from 'react-hot-toast';
import styles from './AppsTable.module.css';
import { Routes } from '@/shared/config';
import { Root, Trigger } from '@radix-ui/react-dialog';
import { EditAppModal } from '@/features/create-app/ui';
import { HTTPError } from 'ky';
import { ConfirmModal, Text } from '@/shared/ui';
import { Link, useNavigate } from 'react-router-dom';
import { ProtectedElement } from '@/app/ProtectedElement';

interface ModTableRow extends App {
	id: number;
	name: string;
	packageName: string;
	logo: string;
	modCounts: number;
	status: AppStatus;
}

export const AppsTable = (): JSX.Element => {
	const { error, isError, isLoading, data } = useAllAppsQuery();
	const [editedApp, setEditedApp] = useState<App | null>(null);
	const navigate = useNavigate();

	const columns: GridColDef<ModTableRow>[] = [
		{
			field: 'name',
			resizable: false,
			headerName: 'Название',
			flex: 1,
			renderCell: (params): JSX.Element => (
				<Link className={styles['link']} to={Routes.APP_PAGE.replace(':id', params.id.toString())}>
					{params.value}
				</Link>
			)
		},
		{ field: 'packageName', resizable: false, headerName: 'Имя пакета', flex: 1 },
		{
			field: 'logo',
			resizable: false,
			width: 100,
			sortable: false,
			filterable: false,
			headerName: 'Лого',
			renderCell(params): JSX.Element {
				return <img style={{ height: '100%', objectFit: 'contain' }} width={50} height={50} src={params.value} alt="Логотип" />;
			}
		},

		{ field: 'modCounts', resizable: false, type: 'number', headerName: 'Модов', width: 100 },
		{
			field: 'status',
			resizable: false,
			headerName: 'Статус',
			valueOptions: Object.entries(AppStatusLabels).map((e) => ({ label: e[1].name, value: e[0] })),
			width: 150,
			type: 'singleSelect',
			renderCell: (params): JSX.Element => {
				const status = AppStatusLabels[params.value as AppStatus];
				return <p style={{ color: status.color }}>{status.name}</p>;
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
			renderCell: (params): JSX.Element => (
				<ProtectedElement>
					<div className={styles['actions']}>
						<Root>
							<Trigger asChild>
								<button onClick={() => fetchApp(params.row.id)} title="Редактировать">
									✏️
								</button>
							</Trigger>
							{editedApp && <EditAppModal appData={editedApp} />}
						</Root>
						<Root>
							<Trigger asChild>
								<button title="Удалить">🗑️</button>
							</Trigger>
							<ConfirmModal callback={() => deleteAppById(params.row.id)}>
								<>
									<Text>
										Вы действительно хотите удалить приложение <b>{params.row.name}</b>?
									</Text>
								</>
							</ConfirmModal>
						</Root>
					</div>
				</ProtectedElement>
			)
		}
	];

	const fetchApp = async (appId: number): Promise<void> => {
		try {
			const app = await getApp(appId);
			setEditedApp(app);
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message);
			}
		}
	};

	const deleteAppById = async (appId: number): Promise<void> => {
		try {
			await deleteApp(appId);
			navigate(0);
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message);
			}
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(error.message);
		}
	}, [error]);

	if (isError) return <p>Ошибка загрузки</p>;
	if (isLoading || !data) return <p>Загрузка...</p>;

	return (
		<DataGrid
			className={styles['table']}
			rows={data?.map((app) => ({
				...app,
				id: app.id,
				name: app.translations[0].name,
				packageName: app.packageName,
				logo: app.logo,
				modCounts: app._count.mods,
				status: app.status
			}))}
			columns={columns}
			getRowId={(row) => row.id}
		/>
	);
};
