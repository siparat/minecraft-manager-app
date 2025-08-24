import { useAppStore } from '@/entities/app';
import { BackToApp } from '@/features/back-to-app';
import { type JSX } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './AppSdkPage.module.css';
import { Title } from '@/shared/ui';
import { ToggleAdsVisibility } from '@/features/toggle-ads-visibility';
import { SdkIds } from '@/widgets/sdk-panel';
import { SdkTokens } from '@/widgets/sdk-panel/ui/SdkTokens/SdkTokens';

export const AppSdkPage = (): JSX.Element => {
	const app = useAppStore((state) => state.app);

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
		</div>
	);
};
