import { keepPreviousData, useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { searchMods, type ModQueryResponse } from '@/entities/mod';
import type { GridSortModel } from '@mui/x-data-grid';
import type { OperationValue } from '@/features/comparison-operator-select/model/constants';
import type { ModCategory } from 'minecraft-manager-schemas';

export const useModsQuery = (
	take: number,
	skip: number,
	q?: string,
	versions?: string[],
	commentsCount?: number,
	rating?: number,
	commentsCountOperator?: OperationValue,
	ratingOperator?: OperationValue,
	category?: ModCategory,
	sort?: GridSortModel[number]
): UseQueryResult<ModQueryResponse, HTTPError> => {
	return useQuery({
		queryKey: ['mods', take, skip, q, versions, commentsCount, rating, commentsCountOperator, ratingOperator, category, sort],
		queryFn: () => searchMods({ take, skip, q, versions, commentsCount, rating, commentsCountOperator, ratingOperator, category, sort }),
		placeholderData: keepPreviousData
	});
};
