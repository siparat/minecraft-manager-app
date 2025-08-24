import { Input } from '@/shared/ui';
import { useRef, useState, type HTMLAttributes, type JSX } from 'react';
import EditIcon from '@/shared/assets/icons/edit.svg?react';
import TickIcon from '@/shared/assets/icons/tick.svg?react';
import classNames from 'classnames';
import styles from './EditableProp.module.css';

interface Props<T extends string> extends HTMLAttributes<HTMLDivElement> {
	name: T;
	defaultValue?: string;
	onSave?: (name: T, value: string) => void;
	placeholder?: string;
	label?: string;
}

export const EditableProp = <T extends string>({
	className,
	defaultValue,
	name,
	onSave,
	placeholder,
	label,
	...props
}: Props<T>): JSX.Element => {
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [value, setValue] = useState<string>(defaultValue || '');
	const ref = useRef<HTMLInputElement>(null);

	const onToggle = (): void => {
		if (isEditable) {
			onSave?.(name, value);
		} else {
			setTimeout(() => ref.current?.focus(), 0);
		}
		setIsEditable((state) => !state);
	};

	return (
		<div {...props} className={classNames(className, styles['wrapper'], { [styles['editable']]: isEditable })}>
			<Input
				ref={ref}
				value={value}
				onChange={(e) => setValue(e.currentTarget.value)}
				label={label}
				disabled={!isEditable}
				placeholder={placeholder}
			/>
			<button onClick={onToggle} className={classNames(styles['button'])}>
				{isEditable ? <TickIcon /> : <EditIcon />}
			</button>
		</div>
	);
};
