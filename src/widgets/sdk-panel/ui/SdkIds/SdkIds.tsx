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
		</div>
	);
};
