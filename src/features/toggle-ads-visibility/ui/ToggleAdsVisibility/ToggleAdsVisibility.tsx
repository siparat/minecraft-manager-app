import { Switch } from '@/shared/ui';
import { useState, type JSX } from 'react';
import styles from './ToggleAdsVisibility.module.css';
import { HTTPError } from 'ky';
import toast from 'react-hot-toast';
import { toggleAdsVisibility } from '../..';
import { useAppStore } from '@/entities/app';
import { ToggleDetailsAdsVisibility } from './ToggleDetailsAdsVisibility';
import classNames from 'classnames';
import ChevronIcon from '@/shared/assets/icons/chevron.svg?react';

export const ToggleAdsVisibility = (): JSX.Element => {
	const app = useAppStore((state) => state.app);
	const setApp = useAppStore((state) => state.setApp);
	const [isOpen, setIsOpen] = useState(false);

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
		<div className={styles['container']}>
			<div className={styles['wrapper']}>
				<div className={styles['leftSide']}>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className={classNames(styles['arrowButton'], { [styles['arrowOpen']]: isOpen })}
						type="button">
						<ChevronIcon />
					</button>
					<p className={styles['message']}>Показывать рекламу</p>
				</div>
				<Switch value={app.sdk.isAdsEnabled} onSwitch={onSwitch} />
			</div>

			<div className={classNames(styles['accordion'], { [styles['accordionOpen']]: isOpen })}>
				<div className={styles['accordionContent']}>{<ToggleDetailsAdsVisibility sdk={app.sdk} />}</div>
			</div>
		</div>
	);
};
