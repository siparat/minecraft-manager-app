import { ApiRoutes, httpClient } from '@/shared/api';
import type { ModReactionSummary } from '../model';

export const getModReactions = (modId: number): Promise<ModReactionSummary> => {
	return httpClient.get(ApiRoutes.GET_MOD_REACTIONS(modId)).json();
};
