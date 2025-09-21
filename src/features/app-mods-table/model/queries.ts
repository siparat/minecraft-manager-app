import { keepPreviousData, useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import { type ModQueryResponse } from '@/entities/mod';
import type { GridSortModel } from '@mui/x-data-grid';
import { searchAppMods } from '../api';
import type { OperationValue } from '@/features/comparison-operator-select/model/constants';
import type { ModCategory } from 'minecraft-manager-schemas';

export const useAppModsQuery = (
	appId: number,
	isActived: boolean,
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
		queryKey: [
			'appMods',
			appId,
			isActived,
			take,
			skip,
			q,
			versions,
			commentsCount,
			rating,
			commentsCountOperator,
			ratingOperator,
			category,
			sort
		],
		queryFn: () =>
			searchAppMods(appId, isActived, {
				take,
				skip,
				q,
				versions,
				commentsCount,
				rating,
				commentsCountOperator,
				ratingOperator,
				category,
				sort
			}),
		placeholderData: keepPreviousData
	});
};
