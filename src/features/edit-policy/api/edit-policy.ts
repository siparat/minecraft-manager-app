import type { Policy } from '@/entities/policy';
import { ApiRoutes, httpClient } from '@/shared/api';
import type { CreatePolicySchema } from 'minecraft-manager-schemas';
import type z from 'zod';

export const editPolicy = (slug: string, dto: z.infer<typeof CreatePolicySchema>): Promise<Policy> => {
	return httpClient.put(ApiRoutes.EDIT_POLICY(slug), { json: dto }).json();
};
