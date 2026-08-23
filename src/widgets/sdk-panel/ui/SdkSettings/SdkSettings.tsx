import { useAppStore } from '@/entities/app';
import { Input, Title } from '@/shared/ui';
import { type JSX } from 'react';
import styles from './SdkSettings.module.css';
import { useUpdateSdkStore } from '../../model/store';
import { Select } from 'antd';
import { AdsNativeType } from 'minecraft-manager-schemas/build/app/ads-native-type.enum';

export const SdkSettings = (): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const setProp = useUpdateSdkStore((state) => state.setProp);

	return (
		<div>
			<Title className={styles['title']} tag="h2">
				Настройки
			</Title>
			<Input
				type="number"
				min={0}
				onChange={(e) => setProp('delayInter', Number(e.currentTarget.value))}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.delayInter || undefined}
				label="Межстраничная задержка (сек)"
				placeholder="120"
			/>
			<Input
				type="number"
				min={0}
				onChange={(e) => setProp('countNativePreload', Number(e.currentTarget.value))}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.countNativePreload || undefined}
				label="Кэширование нативной рекламы (кол-во)"
				placeholder="5"
			/>
			<Input
				type="number"
				min={0}
				onChange={(e) => setProp('skipBeforeFirstInterAdsCount', Number(e.currentTarget.value))}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.skipBeforeFirstInterAdsCount || undefined}
				label="Пропусков до первого показа межстраничной рекламы (кол-во)"
				placeholder="0"
			/>
			<Input
				type="number"
				min={0}
				onChange={(e) => setProp('adsInverval', Number(e.currentTarget.value))}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.adsInverval || undefined}
				label="Интервал рекламы между модами"
				placeholder="3"
			/>
			<fieldset className={styles['editableProp']}>
				<p className={styles['label']}>Вид нативной рекламы</p>
				<Select
					className={styles['select']}
					placeholder="Выберите"
					defaultValue={app?.sdk.adsNativeType}
					options={Object.values(AdsNativeType).map((c) => ({ value: c, label: c }))}
					onChange={(v) => setProp('adsNativeType', v)}
				/>
			</fieldset>
			<div className={styles['separator']} />
			<Input
				type="number"
				min={0}
				max={100}
				onChange={(e) => setProp('chanceShowNativeAds', Math.min(Number(e.currentTarget.value), 100))}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.chanceShowNativeAds || undefined}
				label="Шанс показа нативной рекламы (%)"
				placeholder="5"
			/>
			<Input
				type="number"
				min={0}
				max={100}
				onChange={(e) => setProp('chanceShowOpenAds', Math.min(Number(e.currentTarget.value), 100))}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.chanceShowOpenAds || undefined}
				label="Шанс показа рекламы при открытии (%)"
				placeholder="5"
			/>
			<Input
				type="number"
				min={0}
				max={100}
				onChange={(e) => setProp('chanceShowInterAds', Math.min(Number(e.currentTarget.value), 100))}
				fieldsetClassName={styles['editableProp']}
				defaultValue={app?.sdk.chanceShowInterAds || undefined}
				label="Шанс показа внутренней рекламы (%)"
				placeholder="5"
			/>
		</div>
	);
};
