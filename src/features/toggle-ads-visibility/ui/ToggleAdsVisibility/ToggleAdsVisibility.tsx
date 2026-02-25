import { type JSX } from 'react';
import styles from './ToggleAdsVisibility.module.css';
import { useAppStore } from '@/entities/app';
import { ToggleDetailsAdsVisibility } from './ToggleDetailsAdsVisibility';
import classNames from 'classnames';

export const ToggleAdsVisibility = (): JSX.Element => {
	const app = useAppStore((state) => state.app);

	if (!app) {
		return <></>;
	}

	return (
		<div className={styles['container']}>
			<div className={classNames(styles['accordion'], styles['accordionOpen'])}>
				<div className={styles['accordionContent']}>{<ToggleDetailsAdsVisibility sdk={app.sdk} />}</div>
			</div>
		</div>
	);
};
