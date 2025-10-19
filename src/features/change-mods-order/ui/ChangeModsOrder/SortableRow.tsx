import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { JSX } from 'react';
import styles from './ChangeModsOrder.module.css';
import type { Mod } from '@/entities/mod';

interface Props {
	mod: Mod;
}

export const SortableRow = ({ mod }: Props): JSX.Element => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: mod.id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 9999 : undefined
	};

	return (
		<li ref={setNodeRef} {...attributes} {...listeners} style={style} className={styles['orderItem']}>
			<span className={styles['dragHandle']}>☰</span>
			<img src={mod.image} alt={mod.title} />
			<p>{mod.title}</p>
		</li>
	);
};
