import type { App } from '@/entities/app/model';
import { ApiRoutes, httpClient } from '@/shared/api';
import type { CreateAppSchema } from 'minecraft-manager-schemas';
import type z from 'zod';

export const createApp = async (dto: z.infer<typeof CreateAppSchema>): Promise<App> => {
	return httpClient.post(ApiRoutes.CREATE_APP, { json: dto }).json();
};
