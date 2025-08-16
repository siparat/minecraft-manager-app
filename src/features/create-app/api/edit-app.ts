import type { App } from '@/entities/app/model';
import { ApiRoutes, httpClient } from '@/shared/api';
import type { CreateAppSchema } from 'minecraft-manager-schemas';
import type z from 'zod';

export const editApp = async (id: number, dto: z.infer<typeof CreateAppSchema>): Promise<App> => {
	return httpClient.put(ApiRoutes.EDIT_APP(id), { json: dto }).json();
};
