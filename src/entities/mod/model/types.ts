import type { App } from '@/entities/app';

export interface Mod {
	id: number;
	createdAt: string;
	updatedAt: string;
	isParsed: boolean;
	title: string;
	description: string;
	descriptionImages: string[];
	image: string;
	files: string[];
	parsedSlug?: string;
	htmlDescription?: string;
	versions: ModVersion[];
	_count: {
		apps: number;
	};
	apps?: Pick<App, 'id'>[];
}

export interface ModVersion {
	version: string;
}

export interface ModQueryResponse {
	mods: Mod[];
	count: number;
}
