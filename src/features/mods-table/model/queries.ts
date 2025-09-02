import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { searchMods, type ModQueryResponse } from '@/entities/mod';
import type { GridSortModel } from '@mui/x-data-grid';

export const useModsQuery = (
	take: number,
	skip: number,
	q?: string,
	versions?: string[],
	sort?: GridSortModel[number]
): UseQueryResult<ModQueryResponse, HTTPError> => {
	return useQuery({
		queryKey: ['mods', take, skip, q, versions, sort],
		queryFn: () => searchMods({ take, skip, q, versions, sort })
	});
};
