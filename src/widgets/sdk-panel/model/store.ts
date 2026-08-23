import type { AppSdk } from '@/entities/app';
import type { UpdateSdkSchema } from 'minecraft-manager-schemas';
import type z from 'zod';
import { create } from 'zustand';

type UpdateSdk = Partial<z.infer<typeof UpdateSdkSchema>> & { skipBeforeFirstInterAdsCount?: number };

interface UpdateSdkStore {
	initialSdk?: AppSdk;
	setInitialSdk: (sdk: AppSdk) => void;
	newSdk: UpdateSdk;
	setNewSdk: (sdk: UpdateSdk) => void;
	setProp: <K extends keyof UpdateSdk>(name: K, value: UpdateSdk[K]) => void;
}

export const useUpdateSdkStore = create<UpdateSdkStore>((set, get) => ({
	newSdk: {},
	setInitialSdk: (sdk): void => set({ initialSdk: sdk }),
	setNewSdk: (sdk): void => set({ newSdk: sdk }),
	setProp: (name, value): void => {
		set({ newSdk: { ...get().newSdk, [name]: value } });
	}
}));
