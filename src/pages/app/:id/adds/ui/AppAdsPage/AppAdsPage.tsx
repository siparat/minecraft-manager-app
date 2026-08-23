import { useAppStore } from '@/entities/app';
import { createAppAd, deleteAppAd, exportAppAds, getAppAds, importAppAds, updateAppAd, type AppAd } from '@/entities/app-ads';
import { BackToApp } from '@/features/back-to-app';
import { Button, Input, Switch, Title } from '@/shared/ui';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import classNames from 'classnames';
import { HTTPError } from 'ky';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import styles from './AppAdsPage.module.css';

export const AppAdsPage = (): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const fileRef = useRef<HTMLInputElement>(null);
	const [ads, setAds] = useState<AppAd[]>([]);
	const [form, setForm] = useState<AppAd>({ adId: '', label: '', isEnabled: true });

	const loadAds = async (): Promise<void> => {
		if (!app) return;
		setAds(await getAppAds(app.id));
	};

	const saveAd = async (event: FormEvent): Promise<void> => {
		event.preventDefault();
		if (!app) return;
		const toastId = toast.loading('Добавление рекламы...');
		try {
			await createAppAd(app.id, form);
			setForm({ adId: '', label: '', isEnabled: true });
			await loadAds();
			toast.success('Реклама добавлена', { id: toastId });
		} catch (error) {
			if (error instanceof HTTPError) toast.error(error.message, { id: toastId });
		}
	};

	const toggleAd = async (ad: AppAd, isEnabled: boolean): Promise<void> => {
		if (!app) return;
		try {
			await updateAppAd(app.id, ad.adId, { isEnabled });
			setAds((items) => items.map((item) => (item.adId === ad.adId ? { ...item, isEnabled } : item)));
		} catch (error) {
			if (error instanceof HTTPError) toast.error(error.message);
		}
	};

	const removeAd = async (adId: string): Promise<void> => {
		if (!app) return;
		const toastId = toast.loading('Удаление...');
		try {
			await deleteAppAd(app.id, adId);
			setAds((items) => items.filter((item) => item.adId !== adId));
			toast.success('Реклама удалена', { id: toastId });
		} catch (error) {
			if (error instanceof HTTPError) toast.error(error.message, { id: toastId });
		}
	};

	const downloadExport = async (): Promise<void> => {
		if (!app) return;
		const data = await exportAppAds(app.id);
		const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
		const link = document.createElement('a');
		link.href = url;
		link.download = `app-${app.id}-ads.json`;
		link.click();
		URL.revokeObjectURL(url);
	};

	const uploadImport = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
		if (!app || !event.currentTarget.files?.[0]) return;
		const toastId = toast.loading('Импорт...');
		try {
			const ads = JSON.parse(await event.currentTarget.files[0].text()) as AppAd[];
			const result = await importAppAds(app.id, ads);
			await loadAds();
			toast.success(`Импортировано: ${result.count}`, { id: toastId });
		} catch (error) {
			if (error instanceof HTTPError) toast.error(error.message, { id: toastId });
			else toast.error('Некорректный JSON-файл', { id: toastId });
		} finally {
			event.currentTarget.value = '';
		}
	};

	useEffect(() => {
		setAds(app?.ads || []);
	}, [app]);

	if (!app) return <></>;

	const columns: GridColDef<AppAd>[] = [
		{ field: 'adId', headerName: 'ID', flex: 1, filterable: false },
		{ field: 'label', headerName: 'Label', flex: 1, filterable: false },
		{
			field: 'status',
			headerName: '',
			width: 70,
			sortable: false,
			filterable: false,
			renderCell: ({ row }) => <span className={classNames(styles['status'], { [styles['enabled']]: row.isEnabled })} />
		},
		{
			field: 'actions',
			headerName: 'Статус',
			width: 190,
			sortable: false,
			filterable: false,
			renderCell: ({ row }) => (
				<div className={styles['rowActions']}>
					<Switch value={row.isEnabled} onSwitch={(value) => toggleAd(row, value)} />
					<button onClick={() => removeAd(row.adId)} title="Удалить">
						🗑
					</button>
				</div>
			)
		}
	];

	return (
		<div className={styles['page']}>
			<Helmet>
				<title>Реклама приложения {app.translations[0].name}</title>
			</Helmet>
			<BackToApp />
			<Title className={styles['title']} tag="h1">
				Компоненты рекламы
			</Title>
			<section className={styles['panel']}>
				<form className={styles['form']} onSubmit={saveAd}>
					<Input required label="ID" value={form.adId} onChange={(e) => setForm({ ...form, adId: e.currentTarget.value })} />
					<Input required label="Label" value={form.label} onChange={(e) => setForm({ ...form, label: e.currentTarget.value })} />
					<Switch
						type="button"
						style={{ scale: '1.2', marginBottom: 4 }}
						value={form.isEnabled}
						onSwitch={(value) => setForm({ ...form, isEnabled: value })}
					/>
					<Button style={{ paddingBlock: 10 }}>Добавить</Button>
				</form>
			</section>
			<section className={styles['panel']}>
				<div className={styles['actions']}>
					<Button type="button" appearance="ghost" onClick={downloadExport}>
						Экспорт
					</Button>
					<Button type="button" appearance="ghost" onClick={() => fileRef.current?.click()}>
						Импорт
					</Button>
					<input ref={fileRef} className={styles['file']} type="file" accept="application/json" onChange={uploadImport} />
				</div>
				<DataGrid className={styles['table']} rows={ads} columns={columns} getRowId={(row) => row.adId} pageSizeOptions={[25]} />
			</section>
		</div>
	);
};
