import { create, type StateCreator } from 'zustand';
import type { User } from './types';
import { fetchUserInfo } from '../api';

interface UserStore {
	user?: User;
	isLoaded: boolean;
	fetchUserInfo(): Promise<void>;
}

const userStore: StateCreator<UserStore> = (set) => ({
	isLoaded: false,
	fetchUserInfo: async (): Promise<void> => {
		try {
			const user = await fetchUserInfo();
			set({ user, isLoaded: true });
		} catch (error) {
			set({ isLoaded: true });
		}
	}
});

export const useUserStore = create<UserStore>(userStore);
