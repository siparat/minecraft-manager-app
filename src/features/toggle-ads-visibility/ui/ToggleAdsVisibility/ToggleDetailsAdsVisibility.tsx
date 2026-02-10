import { Switch } from '@/shared/ui';
import { type JSX } from 'react';
import toast from 'react-hot-toast';
import styles from './ToggleAdsVisibility.module.css';
import { useAppStore, type AppSdk, type AppSdkAdsType } from '@/entities/app';
import { toggleDetailsAdsVisibility } from '../../api/toggle-details-ads-visibility';
import { HTTPError } from 'ky';

interface ToggleDetailsProps {
	sdk: AppSdk;
}

export const ToggleDetailsAdsVisibility = ({ sdk }: ToggleDetailsProps): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const setApp = useAppStore((state) => state.setApp);

	const handleToggle = async (type: AppSdkAdsType): Promise<void> => {
		if (!app) {
			return;
		}

		const toastId = toast.loading('Обновление настроек...');
		try {
			const updatedSdk = await toggleDetailsAdsVisibility(sdk.appId, type);
			toast.success('Настройки сохранены', { id: toastId });
			setApp({ ...app, sdk: updatedSdk });
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message, { id: toastId });
			}
		}
	};

	return (
		<div className={styles['details']}>
			<div className={styles['header']}>
				<p className={styles['message']}>Open</p>
				<Switch value={sdk.isOpenAdsEnabled} onSwitch={() => handleToggle('open')} />
			</div>
			<div className={styles['header']}>
				<p className={styles['message']}>Native</p>
				<Switch value={sdk.isNativeAdsEnabled} onSwitch={() => handleToggle('native')} />
			</div>
			<div className={styles['header']}>
				<p className={styles['message']}>Inter</p>
				<Switch value={sdk.isInterAdsEnabled} onSwitch={() => handleToggle('inter')} />
			</div>
		</div>
	);
};
