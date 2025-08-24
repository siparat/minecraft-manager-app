import { Switch } from '@/shared/ui';
import { type JSX } from 'react';
import styles from './ToggleAdsVisibility.module.css';
import { HTTPError } from 'ky';
import toast from 'react-hot-toast';
import { toggleAdsVisibility } from '../..';
import { useAppStore } from '@/entities/app';

export const ToggleAdsVisibility = (): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const setApp = useAppStore((state) => state.setApp);

	const onSwitch = async (): Promise<void> => {
		if (!app) {
			return;
		}
		const toastId = toast.loading('Загрузка...');
		try {
			const updatedSdk = await toggleAdsVisibility(app.id);
			toast.success('Реклама ' + (updatedSdk.isAdsEnabled ? 'включена' : 'выключена'), { id: toastId });
			setApp({ ...app, sdk: updatedSdk });
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
		<div className={styles['wrapper']}>
			<p className={styles['message']}>Показывать рекламу</p>
			<Switch value={app.sdk.isAdsEnabled} onSwitch={onSwitch} />
		</div>
	);
};
