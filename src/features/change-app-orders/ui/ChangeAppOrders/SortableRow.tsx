import type { App } from '@/entities/app';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { JSX } from 'react';
import styles from './ChangeAppOrders.module.css';

interface Props {
	app: App;
}

export const SortableRow = ({ app }: Props): JSX.Element => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: app.id });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 9999 : undefined
	};

	return (
		<li ref={setNodeRef} {...attributes} {...listeners} style={style} className={styles['orderItem']}>
			<span className={styles['dragHandle']}>☰</span>
			<img src={app.logo} alt={app.translations[0].name} />
			<p>{app.translations[0].name}</p>
		</li>
	);
};
