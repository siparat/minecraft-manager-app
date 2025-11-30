import type { Policy } from '@/entities/policy';
import { ApiRoutes, httpClient } from '@/shared/api';
import type { CreatePolicySchema } from 'minecraft-manager-schemas';
import type z from 'zod';

export const createNewPolicy = (dto: z.infer<typeof CreatePolicySchema>): Promise<Policy> => {
	return httpClient.post(ApiRoutes.CREATE_POLICY, { json: dto }).json();
};
