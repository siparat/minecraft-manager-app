import { Routes } from '.';
import AppsIcon from '@/shared/assets/icons/apps.svg?react';
import ModsIcon from '@/shared/assets/icons/mods.svg?react';
import ParserIcon from '@/shared/assets/icons/parser.svg?react';

export const Menu = [
	{ label: 'Приложения', path: Routes.MAIN, icon: <AppsIcon /> },
	{ label: 'Моды', path: Routes.MODS, icon: <ModsIcon /> },
	{ label: 'Парсер', path: Routes.PARSER, icon: <ParserIcon /> }
];
