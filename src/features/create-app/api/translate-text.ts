import { ApiRoutes, httpClient } from '@/shared/api';
import type { TranslationResponse } from '@/shared/types';
import { TranslateSchema } from 'minecraft-manager-schemas';
import type z from 'zod';

export const translateText = async (json: z.infer<typeof TranslateSchema>): Promise<TranslationResponse> => {
	return httpClient.post(ApiRoutes.TRANSLATE_TEXT, { json }).json();
};
