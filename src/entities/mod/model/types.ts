import type { App } from '@/entities/app';
import { ModCategory } from 'minecraft-manager-schemas';

export interface Mod {
	id: number;
	createdAt: string;
	updatedAt: string;
	category: ModCategory;
	isParsed: boolean;
	rating: number | null;
	commentCounts: number;
	title: string;
	description: string;
	descriptionImages: string[];
	image: string;
	files: string[];
	parsedSlug?: string;
	htmlDescription?: string;
	versions: ModVersion[];
	_count: {
		apps: number; //!
	};
	apps?: Pick<App, 'id'>[];
}

export interface ModVersion {
	version: string;
}

export type ModReactionType = 'LIKE' | 'FIRE' | 'LOVE' | 'FUNNY' | 'WOW';

export interface ModReactionSummary {
	selected: ModReactionType | null;
	counts: Record<ModReactionType, number>;
	total: number;
}

export interface ModDownloadsSummary {
	total: number;
	apps: {
		appId: number;
		packageName: string;
		name: string;
		downloadsCount: number;
	}[];
}

export interface ModQueryResponse {
	mods: Mod[];
	count: number;
}
