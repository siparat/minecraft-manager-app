import { AppStatus, AppStatusLabels, useAppStore } from '@/entities/app';
import type { JSX } from 'react';
import { Select } from 'antd';
import styles from './SelectAppStatus.module.css';
import toast from 'react-hot-toast';
import { setNewAppStatus } from '@/entities/app';
import { HTTPError } from 'ky';

export const SelectAppStatus = (): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const setApp = useAppStore((state) => state.setApp);

	const onChange = async (value: AppStatus): Promise<void> => {
		if (!app) {
			return;
		}

		const toastId = toast.loading('Обновление статуса');
		try {
			const { status } = await setNewAppStatus(app.id, value);
			setApp({ ...app, status });
			toast.success('Статус успешно обновлен', { id: toastId });
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message, { id: toastId });
			}
		}
	};

	if (!app) {
		return <></>;
	}

	return (
		<Select
			style={{ ['--color' as any]: AppStatusLabels[app.status].color }}
			className={styles['select']}
			variant="borderless"
			defaultValue={app.status}
			onChange={onChange}>
			{Object.entries(AppStatusLabels).map(([value, { name }]) => (
				<Select.Option key={value} value={value}>
					{name}
				</Select.Option>
			))}
		</Select>
	);
};
