export interface Mod {
	id: number;
	createdAt: string;
	updatedAt: string;
	title: string;
	description: string;
	image: string;
	files: string[];
	versions: ModVersion[];
	_count: {
		apps: number;
	};
}

export interface ModVersion {
	version: string;
}

export interface ModQueryResponse {
	mods: Mod[];
	count: number;
}
