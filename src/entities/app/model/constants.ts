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
	[AppStatus.PUBLISHED]: {
		name: 'Опубликовано',
		color: '#09C269'
	}
};
