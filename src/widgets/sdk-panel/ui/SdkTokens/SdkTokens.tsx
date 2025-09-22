import { useAppStore } from '@/entities/app';
import { Input, Title } from '@/shared/ui';
import { type JSX } from 'react';
import styles from './SdkTokens.module.css';
import { useUpdateSdkStore } from '../../model/store';

export const SdkTokens = (): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const setProp = useUpdateSdkStore((state) => state.setProp);

	return (
		<div>
			<Title className={styles['title']} tag="h2">
				AppLovin
			</Title>
			<Input
				onChange={(e) => setProp('secondOpenCode', e.currentTarget.value)}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.secondOpenCode || undefined}
				label="При открытии"
				placeholder="xxxxxxxxxx"
			/>
			<Input
				onChange={(e) => setProp('secondInterCode', e.currentTarget.value)}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.secondInterCode || undefined}
				label="Межстраничная"
				placeholder="xxxxxxxxxx"
			/>
			<Input
				onChange={(e) => setProp('secondNativeCode', e.currentTarget.value)}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.secondNativeCode || undefined}
				label="Нативная"
				placeholder="xxxxxxxxxx"
			/>

			<Title className={styles['title']} tag="h2">
				Яндекс РСЯ
			</Title>
			<Input
				onChange={(e) => setProp('thirdOpenCode', e.currentTarget.value)}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.thirdOpenCode || undefined}
				label="При открытии"
				placeholder="xxxxxxxxxx"
			/>
			<Input
				onChange={(e) => setProp('thirdInterCode', e.currentTarget.value)}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.thirdInterCode || undefined}
				label="Межстраничная"
				placeholder="xxxxxxxxxx"
			/>
			<Input
				onChange={(e) => setProp('thirdNativeCode', e.currentTarget.value)}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.thirdNativeCode || undefined}
				label="Нативная"
				placeholder="xxxxxxxxxx"
			/>
		</div>
	);
};
