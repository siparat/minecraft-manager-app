import z from 'zod';
import { UpdateSdkSchema } from 'minecraft-manager-schemas';
import type { AppSdk } from '../model';
import { ApiRoutes, httpClient } from '@/shared/api';

export const updateSdkProps = async (appId: number, dto: Partial<z.infer<typeof UpdateSdkSchema>>): Promise<AppSdk> => {
	return httpClient.put(ApiRoutes.UPDATE_SDK(appId), { json: dto }).json();
};
