import { useAppStore } from '@/entities/app';
import { EditableProp } from '@/entities/editable-prop';
import { Title } from '@/shared/ui';
import type { UpdateSdkSchema } from 'minecraft-manager-schemas';
import { type JSX } from 'react';
import type z from 'zod';
import { updateSdkProp } from '../../model';
import styles from './SdkTokens.module.css';

export const SdkTokens = (): JSX.Element => {
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
				AdMob
			</Title>
			<EditableProp
				className={styles['editableProp']}
				onSave={onUpdateProp}
				defaultValue={app?.sdk.firstOpenCode || undefined}
				name="firstOpenCode"
				label="При открытии"
				placeholder="xxxxxxxxxx"
			/>
			<EditableProp
				className={styles['editableProp']}
				onSave={onUpdateProp}
				defaultValue={app?.sdk.firstInterCode || undefined}
				name="firstInterCode"
				label="Межстраничная"
				placeholder="xxxxxxxxxx"
			/>
			<EditableProp
				className={styles['editableProp']}
				onSave={onUpdateProp}
				defaultValue={app?.sdk.firstNativeCode || undefined}
				name="firstNativeCode"
				label="Нативная"
				placeholder="xxxxxxxxxx"
			/>

			<Title className={styles['title']} tag="h2">
				AppLovin
			</Title>
			<EditableProp
				className={styles['editableProp']}
				onSave={onUpdateProp}
				defaultValue={app?.sdk.secondOpenCode || undefined}
				name="secondOpenCode"
				label="При открытии"
				placeholder="xxxxxxxxxx"
			/>
			<EditableProp
				className={styles['editableProp']}
				onSave={onUpdateProp}
				defaultValue={app?.sdk.secondInterCode || undefined}
				name="secondInterCode"
				label="Межстраничная"
				placeholder="xxxxxxxxxx"
			/>
			<EditableProp
				className={styles['editableProp']}
				onSave={onUpdateProp}
				defaultValue={app?.sdk.secondNativeCode || undefined}
				name="secondNativeCode"
				label="Нативная"
				placeholder="xxxxxxxxxx"
			/>

			<Title className={styles['title']} tag="h2">
				Яндекс РСЯ
			</Title>
			<EditableProp
				className={styles['editableProp']}
				onSave={onUpdateProp}
				defaultValue={app?.sdk.thirdOpenCode || undefined}
				name="thirdOpenCode"
				label="При открытии"
				placeholder="xxxxxxxxxx"
			/>
			<EditableProp
				className={styles['editableProp']}
				onSave={onUpdateProp}
				defaultValue={app?.sdk.thirdInterCode || undefined}
				name="thirdInterCode"
				label="Межстраничная"
				placeholder="xxxxxxxxxx"
			/>
			<EditableProp
				className={styles['editableProp']}
				onSave={onUpdateProp}
				defaultValue={app?.sdk.thirdNativeCode || undefined}
				name="thirdNativeCode"
				label="Нативная"
				placeholder="xxxxxxxxxx"
			/>
		</div>
	);
};
