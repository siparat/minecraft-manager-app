import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { type ModQueryResponse } from '@/entities/mod';
import type { GridSortModel } from '@mui/x-data-grid';
import { searchAppMods } from '../api';

export const useAppModsQuery = (
	appId: number,
	isActived: boolean,
	take: number,
	skip: number,
	q?: string,
	versions?: string[],
	sort?: GridSortModel[number]
): UseQueryResult<ModQueryResponse, HTTPError> => {
	return useQuery({
		queryKey: ['appMods', appId, isActived, take, skip, q, versions, sort],
		queryFn: () => searchAppMods(appId, isActived, { take, skip, q, versions, sort })
	});
};
