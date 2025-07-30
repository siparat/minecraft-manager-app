import type z from 'zod';
import { LoginSchema } from 'minecraft-manager-schemas';
import type { LoginResponse } from '../model';
import { httpClient } from '@/shared/api';
import { ApiRoutes } from '@/shared/api';

export const login = async (dto: z.infer<typeof LoginSchema>): Promise<LoginResponse> => {
	return await httpClient.post(ApiRoutes.LOGIN, { json: dto }).json<LoginResponse>();
};
