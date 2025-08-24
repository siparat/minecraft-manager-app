import type { ButtonHTMLAttributes, JSX } from 'react';
import styles from './Switch.module.css';
import classNames from 'classnames';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
	value: boolean;
	onSwitch: (value: boolean) => any;
}

export const Switch = ({ className, value, onSwitch, ...props }: Props): JSX.Element => {
	return (
		<button
			onClick={() => onSwitch(!value)}
			{...props}
			className={classNames(className, styles['switch'], { [styles['enable']]: !!value })}></button>
	);
};
