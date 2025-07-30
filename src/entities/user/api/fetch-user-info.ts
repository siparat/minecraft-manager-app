import { ApiRoutes, httpClient } from '@/shared/api';
import type { User } from '../model';

export const fetchUserInfo = async (): Promise<User> => {
	return httpClient.get(ApiRoutes.GET_MY_INFO).json<User>();
};
