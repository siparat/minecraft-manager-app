import { create } from 'zustand';

interface AuthStore {
	token?: string;
	setToken: (token: string) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	setToken: (token: string): void => {
		set({ token });
		localStorage.setItem('token', token);
	},
	logout: (): void => {
		set({ token: undefined });
		localStorage.removeItem('token');
	}
}));
