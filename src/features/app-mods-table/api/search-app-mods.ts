import type { ModQueryResponse } from '@/entities/mod';
import type { OperationValue } from '@/features/comparison-operator-select/model/constants';
import { ApiRoutes, httpClient } from '@/shared/api';
import { constructSearchParamsValue } from '@/shared/lib';
import type { GridSortModel } from '@mui/x-data-grid';
import type { ModCategory } from 'minecraft-manager-schemas';

interface Params {
	q?: string;
	take?: number;
	skip?: number;
	versions?: string[];
	commentsCount?: number;
	rating?: number;
	commentsCountOperator?: OperationValue;
	ratingOperator?: OperationValue;
	category?: ModCategory;
	sort?: GridSortModel[number] | { field: string; sort: 'asc' | 'desc' };
}

export const searchAppMods = async (appId: number, isActived: boolean, { sort, ...params }: Params): Promise<ModQueryResponse> => {
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
	return httpClient.get(ApiRoutes.SEARCH_APP_MODS(appId, isActived), { searchParams }).json();
};
