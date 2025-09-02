import { create } from 'zustand';
import type { Mod, ModVersion } from './types';
import { getAllVersions } from '../api';

interface ModStore {
	mod?: Mod;
	setMod: (mod: Mod) => void;
	allVersions: ModVersion[];
	fetchAllVersions: () => Promise<void>;
}

export const useModStore = create<ModStore>((set) => ({
	allVersions: [],
	fetchAllVersions: async (): Promise<void> => {
		try {
			const allVersions = await getAllVersions();
			set({ allVersions });
		} catch (error) {
			return;
		}
	},
	setMod: (mod): void => set({ mod })
}));
