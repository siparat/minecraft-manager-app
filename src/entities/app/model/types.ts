export enum AppStatus {
	PLANNED = 'PLANNED',
	IN_PROGRESS = 'IN_PROGRESS',
	IN_MODERATION = 'IN_MODERATION',
	IN_CORRECTION = 'IN_CORRECTION',
	PUBLISHED = 'PUBLISHED'
}

export enum AppIssueStatus {
	CREATED = 'CREATED',
	SOLVED = 'SOLVED',
	DELETED = 'DELETED'
}

export interface App {
	id: number;
	status: AppStatus;
	packageName: string;
	logo: string;
	banner: string;
	firebaseFile?: string;
	apk?: string;
	bundle?: string;
	appScreenshots: string[];
	sdk: AppSdk;
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

export interface AppIssuesCounts {
	created: number;
	solved: number;
}

export interface AppIssue {
	id: number;
	createdAt: string;
	email: string;
	text: string;
	status: AppIssueStatus;
	appId: number;
}

export interface AppSdk {
	adMobToken: string | null;
	appId: number;
	appLovinToken: string | null;
	firstInterCode: string | null;
	firstNativeCode: string | null;
	firstOpenCode: string | null;
	isAdsEnabled: boolean;
	metricaToken: string | null;
	secondInterCode: string | null;
	secondNativeCode: string | null;
	secondOpenCode: string | null;
	thirdInterCode: string | null;
	thirdNativeCode: string | null;
	thirdOpenCode: string | null;
}

export interface AppLanguage {
	id: number;
	code: string;
	nameOriginal: string;
	nameRu: string;
}
