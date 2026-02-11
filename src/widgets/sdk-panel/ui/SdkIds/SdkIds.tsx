import { useAppStore } from '@/entities/app';
import { Input, Title } from '@/shared/ui';
import { type JSX } from 'react';
import styles from './SdkIds.module.css';
import { useUpdateSdkStore } from '../../model/store';

export const SdkIds = (): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const setProp = useUpdateSdkStore((state) => state.setProp);

	return (
		<div>
			<Title className={styles['title']} tag="h2">
				Идентификаторы
			</Title>
			<Input
				onChange={(e) => setProp('metricaToken', e.currentTarget.value)}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.metricaToken || undefined}
				label="AppMetrica"
				placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
			/>
			<Input
				onChange={(e) => setProp('appLovinToken', e.currentTarget.value)}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.appLovinToken || undefined}
				label="AppLovin"
				placeholder="A1b2C3d4E5F6G7h8I9J0K1L2M3N4O5P6"
			/>
			<Input
				onChange={(e) => setProp('adMobToken', e.currentTarget.value)}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.adMobToken || undefined}
				label="AdMob"
				placeholder="ca-app-pub-QWERTYUIOPLKJHGF~DSAZXCVBNM"
			/>
		</div>
	);
};
