import { useSensors, useSensor, PointerSensor, type DragEndEvent, closestCenter, DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useMemo, useState, type HTMLAttributes, type JSX } from 'react';
import toast from 'react-hot-toast';
import { SortableRow } from './SortableRow';
import styles from './ChangeModsOrder.module.css';
import { Button } from '@/shared/ui';
import { setAppModsOrder } from '../../api';
import type { Mod } from '@/entities/mod';
import type { App } from '@/entities/app';

interface Props extends HTMLAttributes<HTMLDivElement> {
	mods: Mod[];
	app: App;
}

export const ChangeModsOrder = ({ mods, app, ...props }: Props): JSX.Element => {
	const [orderedMods, setOrderedMods] = useState<Mod[]>([]);
	const defaultOrders = useMemo(() => mods.map((mod) => mod.id), [mods]);
	const ordersIsChanged = useMemo(() => defaultOrders.join(',') !== orderedMods.map((a) => a.id).join(','), [defaultOrders, orderedMods]);

	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragEnd = (event: DragEndEvent): void => {
		const { active, over } = event;
		if (!over) return;
		if (active.id === over.id) return;

		const oldIndex = orderedMods.findIndex((a) => a.id === Number(active.id));
		const newIndex = orderedMods.findIndex((a) => a.id === Number(over.id));
		if (oldIndex === -1 || newIndex === -1) return;

		setOrderedMods((prev) => arrayMove(prev, oldIndex, newIndex));
	};

	const saveOrders = async (): Promise<void> => {
		const toastId = toast.loading('Сохранение...');
		try {
			const order = orderedMods.map((a) => a.id);
			await setAppModsOrder(app.id, order);
			toast.success('Порядок успешно сохранён', { id: toastId });
		} catch (e) {
			toast.error('Не удалось сохранить порядок', { id: toastId });
		}
	};

	useEffect(() => {
		if (mods) {
			setOrderedMods(mods);
		}
	}, [mods]);

	return (
		<div {...props}>
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext items={orderedMods.map((a) => a.id)} strategy={verticalListSortingStrategy}>
					<ul className={styles['orderList']}>
						{orderedMods.map((mod) => (
							<SortableRow key={mod.id} mod={mod} />
						))}
					</ul>
				</SortableContext>
			</DndContext>

			<Button
				className={styles['saveButton']}
				disabled={!ordersIsChanged}
				appearance={ordersIsChanged ? 'primary' : 'ghost'}
				onClick={saveOrders}>
				Сохранить порядок
			</Button>
		</div>
	);
};
