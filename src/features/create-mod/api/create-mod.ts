import type { Mod } from '@/entities/mod';
import { ApiRoutes, httpClient } from '@/shared/api';
import type z from 'zod';
import { type CreateModSchema } from 'minecraft-manager-schemas';

export const createMod = (dto: z.infer<typeof CreateModSchema>): Promise<Mod> => {
	return httpClient.post(ApiRoutes.CREATE_MOD, { json: dto }).json();
};
