import type { Mod } from '@/entities/mod';
import { ApiRoutes, httpClient } from '@/shared/api';
import type z from 'zod';
import { type CreateModSchema } from 'minecraft-manager-schemas';

export const editMod = (modId: number, dto: z.infer<typeof CreateModSchema>): Promise<Mod> => {
	return httpClient.put(ApiRoutes.EDIT_MOD(modId), { json: dto }).json();
};
