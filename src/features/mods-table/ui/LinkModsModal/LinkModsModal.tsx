import { ContentBox, Switch, Text } from '@/shared/ui';
import { Portal, Overlay, Content, DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useState, type JSX } from 'react';
import styles from './LinkModsModal.module.css';
import type { Mod } from '@/entities/mod';
import { HTTPError } from 'ky';
import toast from 'react-hot-toast';
import { toggleAppMod } from '@/entities/app-mods-table/api';
import { useAllAppsQuery } from '@/features/apps-table/model';

interface Props {
	modData: Mod;
}

export const LinkModsModal = ({ modData }: Props): JSX.Element => {
	const { isLoading, data } = useAllAppsQuery();

	const [linkedApps, setLinkedApps] = useState(modData.apps ?? []);

	const onToggleMod = async (appId: number, value: boolean): Promise<void> => {
		const toastId = toast.loading('Загрузка...');
		try {
			await toggleAppMod(appId, modData.id);
			toast.success(`Мод был успешно ${value ? 'добавлен' : 'убран'}`, { id: toastId });

			setLinkedApps((prev) => (value ? [...prev, { id: appId }] : prev.filter(({ id }) => id !== appId)));
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message, { id: toastId });
			}
		}
	};

	return (
		<Portal>
			<Overlay className="dialogOverlay" />
			<Content className="dialogContent">
				<VisuallyHidden asChild>
					<DialogTitle>Привязать мод {modData.title}</DialogTitle>
				</VisuallyHidden>
				<ContentBox className={styles['modal']} title={`Привязать мод ${modData.title}`}>
					<ul className={styles['list']}>
						{isLoading
							? 'Загрузка...'
							: data?.map((app) => (
									<li className={styles['row']} key={app.id}>
										<div>
											<img src={'http://youlovehamit.kz' + app.logo} alt={app.translations[0].name} />
											<Text>{app.translations[0].name}</Text>
										</div>
										<div>
											<Switch
												value={linkedApps.some(({ id }) => id === app.id)}
												onSwitch={(value) => onToggleMod(app.id, value)}
											/>
										</div>
									</li>
								))}
					</ul>
				</ContentBox>
			</Content>
		</Portal>
	);
};
