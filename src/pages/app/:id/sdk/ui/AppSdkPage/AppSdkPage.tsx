import { useAppStore } from '@/entities/app';
import { BackToApp } from '@/features/back-to-app';
import { useEffect, useMemo, type JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './AppSdkPage.module.css';
import { Button, Title } from '@/shared/ui';
import { ToggleAdsVisibility } from '@/features/toggle-ads-visibility';
import { SdkIds } from '@/widgets/sdk-panel';
import { SdkTokens } from '@/widgets/sdk-panel/ui/SdkTokens/SdkTokens';
import { useUpdateSdkStore } from '@/widgets/sdk-panel/model/store';
import toast from 'react-hot-toast';
import { HTTPError } from 'ky';
import { updateSdkProps } from '@/entities/app/api';

export const AppSdkPage = (): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const setInitialSdk = useUpdateSdkStore((state) => state.setInitialSdk);
	const newSdk = useUpdateSdkStore((state) => state.newSdk);
	const setNewSdk = useUpdateSdkStore((state) => state.setNewSdk);

	const propsIsEdited = useMemo(() => Object.keys(newSdk).length !== 0, [newSdk]);

	const updateSdk = async (): Promise<void> => {
		if (!app) {
			return;
		}
		const toastId = toast.loading('Обновление данных...');
		try {
			await updateSdkProps(app.id, newSdk);
			setNewSdk({});
			toast.success('Данные успешно обновлены', { id: toastId });
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message, { id: toastId });
			}
		}
	};

	useEffect(() => {
		if (!app) {
			return;
		}
		setInitialSdk(app.sdk);
	}, [app, setInitialSdk]);

	if (!app) {
		return <></>;
	}

	return (
		<div className={styles['page']}>
			<Helmet>
				<title>SDK приложения {app.translations[0].name}</title>
			</Helmet>
			<BackToApp />
			<Title className={styles['title']} tag="h1">
				SDK и реклама
			</Title>
			<ToggleAdsVisibility />
			<section className={styles['wrapper']}>
				<SdkIds />
				<SdkTokens />
			</section>
			<Button
				appearance={propsIsEdited ? 'primary' : 'ghost'}
				disabled={!propsIsEdited}
				className={styles['saveButton']}
				onClick={updateSdk}>
				Сохранить
			</Button>
		</div>
	);
};
