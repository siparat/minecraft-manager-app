import { ApiRoutes, httpClient } from '@/shared/api';
import type { ModQueryResponse } from '../model';
import { constructSearchParamsValue } from '@/shared/lib';
import type { GridSortModel } from '@mui/x-data-grid';

interface Params {
	q?: string;
	take?: number;
	skip?: number;
	versions?: string[];
	sort?: GridSortModel[number];
}

export const searchMods = async ({ sort, ...params }: Params): Promise<ModQueryResponse> => {
	const searchParams = new URLSearchParams();
	for (const key in params) {
		const value = params[key as keyof Omit<Params, 'sort'>];
		if (!value) {
			continue;
		}
		searchParams.set(key, constructSearchParamsValue(value));
	}
	if (sort && sort.sort) {
		searchParams.set('sort_key', sort.field);
		searchParams.set('sort_value', sort.sort);
	}
	return httpClient.get(ApiRoutes.SEARCH_MODS, { searchParams }).json<ModQueryResponse>();
};
