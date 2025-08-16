import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getAllApps } from '../api';
import type { App } from '@/entities/app';
import type { HTTPError } from 'ky';

export const useAllAppsQuery = (): UseQueryResult<App[], HTTPError> => {
	return useQuery({
		queryKey: ['allApps'],
		queryFn: getAllApps
	});
};
