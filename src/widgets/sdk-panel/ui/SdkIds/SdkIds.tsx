import { useAppStore } from '@/entities/app';
import { EditableProp } from '@/entities/editable-prop';
import { Title } from '@/shared/ui';
import type { UpdateSdkSchema } from 'minecraft-manager-schemas';
import { type JSX } from 'react';
import type z from 'zod';
import { updateSdkProp } from '../../model';
import styles from './SdkIds.module.css';

export const SdkIds = (): JSX.Element => {
	const app = useAppStore((state) => state.app);

	const onUpdateProp = async (name: keyof z.infer<typeof UpdateSdkSchema>, value: string): Promise<void> => {
		if (!app) {
			return;
		}
		updateSdkProp(app.id, name, value);
	};

	return (
		<div>
			<Title className={styles['title']} tag="h2">
				Идентификаторы
			</Title>
			<EditableProp
				className={styles['editableProp']}
				onSave={onUpdateProp}
				defaultValue={app?.sdk.metricaToken || undefined}
				name="metricaToken"
				label="AppMetrica"
				placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
			/>
			<EditableProp
				className={styles['editableProp']}
				onSave={onUpdateProp}
				defaultValue={app?.sdk.appLovinToken || undefined}
				name="appLovinToken"
				label="AppLovin"
				placeholder="A1b2C3d4E5F6G7h8I9J0K1L2M3N4O5P6"
			/>
			<EditableProp
				className={styles['editableProp']}
				onSave={onUpdateProp}
				defaultValue={app?.sdk.adMobToken || undefined}
				name="adMobToken"
				label="AdMob"
				placeholder="ca-app-pub-QWERTYUIOPLKJHGF~DSAZXCVBNM"
			/>
		</div>
	);
};
