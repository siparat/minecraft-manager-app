import { AppStatus } from './types';

export const AppStatusLabels = {
	[AppStatus.PLANNED]: {
		name: 'Запланировано',
		color: '#484964'
	},
	[AppStatus.IN_PROGRESS]: {
		name: 'В работе',
		color: '#0C09C2'
	},
	[AppStatus.IN_MODERATION]: {
		name: 'На модерации',
		color: '#b50cdfff'
	},
	[AppStatus.IN_CORRECTION]: {
		name: 'На доработке',
		color: '#FA5757'
	},
	[AppStatus.PUBLISHED]: {
		name: 'Опубликовано',
		color: '#09C269'
	}
};
