import type { JSX } from 'react';
import styles from './CreateModButton.module.css';

export const CreateModButton = (): JSX.Element => {
	return <p className={styles['addModButton']}>+</p>;
};
