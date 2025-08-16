export enum AppStatus {
	PLANNED = 'PLANNED',
	IN_PROGRESS = 'IN_PROGRESS',
	PUBLISHED = 'PUBLISHED'
}

export interface App {
	id: number;
	status: AppStatus;
	packageName: string;
	logo: string;
	banner: string;
	translations: (Omit<AppTranslation, 'languageId'> & { language: AppLanguage })[];
	_count: {
		mods: number;
	};
}

export interface AppTranslation {
	id: number;
	name: string;
	languageId: number;
}

export interface AppLanguage {
	id: number;
	code: string;
	nameOriginal: string;
	nameRu: string;
}
