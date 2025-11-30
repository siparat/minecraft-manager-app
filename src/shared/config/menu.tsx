import { Routes } from '.';
import AppsIcon from '@/shared/assets/icons/apps.svg?react';
import ModsIcon from '@/shared/assets/icons/mods.svg?react';
import DocumentIcon from '@/shared/assets/icons/document.svg?react';

export const Menu = [
	{ label: 'Приложения', path: Routes.MAIN, icon: <AppsIcon /> },
	{ label: 'Моды', path: Routes.MODS, icon: <ModsIcon /> },
	{ label: 'Политики', path: Routes.POLICIES, icon: <DocumentIcon /> }
];
