import type { AppSdk } from '@/entities/app';
import type { UpdateSdkSchema } from 'minecraft-manager-schemas';
import type z from 'zod';
import { create } from 'zustand';

interface UpdateSdkStore {
	initialSdk?: AppSdk;
	setInitialSdk: (sdk: AppSdk) => void;
	newSdk: Partial<z.infer<typeof UpdateSdkSchema>>;
	setNewSdk: (sdk: Partial<z.infer<typeof UpdateSdkSchema>>) => void;
	setProp: (name: keyof z.infer<typeof UpdateSdkSchema>, value: string) => void;
}

export const useUpdateSdkStore = create<UpdateSdkStore>((set, get) => ({
	newSdk: {},
	setInitialSdk: (sdk): void => set({ initialSdk: sdk }),
	setNewSdk: (sdk): void => set({ newSdk: sdk }),
	setProp: (name, value): void => {
		set({ newSdk: { ...get().newSdk, [name]: value } });
	}
}));
