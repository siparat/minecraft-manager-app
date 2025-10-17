import type { App } from '@/entities/app';
import { useSensors, useSensor, PointerSensor, type DragEndEvent, closestCenter, DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useMemo, useState, type HTMLAttributes, type JSX } from 'react';
import toast from 'react-hot-toast';
import { SortableRow } from './SortableRow';
import styles from './ChangeAppOrders.module.css';
import { Button } from '@/shared/ui';
import { setAppOrder } from '../../api';

interface Props extends HTMLAttributes<HTMLDivElement> {
	apps: App[];
}

export const ChangeAppOrders = ({ apps, ...props }: Props): JSX.Element => {
	const [orderedApps, setOrderedApps] = useState<App[]>([]);
	const defaultOrders = useMemo(() => apps.map((app) => app.id), [apps]);
	const ordersIsChanged = useMemo(() => defaultOrders.join(',') !== orderedApps.map((a) => a.id).join(','), [defaultOrders, orderedApps]);

	const sensors = useSensors(useSensor(PointerSensor));

	const handleDragEnd = (event: DragEndEvent): void => {
		const { active, over } = event;
		if (!over) return;
		if (active.id === over.id) return;

		const oldIndex = orderedApps.findIndex((a) => a.id === Number(active.id));
		const newIndex = orderedApps.findIndex((a) => a.id === Number(over.id));
		if (oldIndex === -1 || newIndex === -1) return;

		setOrderedApps((prev) => arrayMove(prev, oldIndex, newIndex));
	};

	const saveOrders = async (): Promise<void> => {
		const toastId = toast.loading('Сохранение...');
		try {
			const order = orderedApps.map((a) => a.id);
			await setAppOrder(order);
			toast.success('Порядок успешно сохранён', { id: toastId });
		} catch (e) {
			toast.error('Не удалось сохранить порядок', { id: toastId });
		}
	};

	useEffect(() => {
		if (apps) {
			setOrderedApps(
				apps.map((app) => ({
					...app,
					id: app.id,
					name: app.translations[0].name,
					packageName: app.packageName,
					logo: app.logo,
					modCounts: app._count.mods,
					status: app.status
				}))
			);
		}
	}, [apps]);

	return (
		<div {...props}>
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext items={orderedApps.map((a) => a.id)} strategy={verticalListSortingStrategy}>
					<ul className={styles['orderList']}>
						{orderedApps.map((app) => (
							<SortableRow key={app.id} app={app} />
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
