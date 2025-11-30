import { create } from 'zustand';
import type { Policy } from './types';

interface PolicyStore {
	policies: Omit<Policy, 'content'>[];
	setPolicies: (policies: Policy[]) => void;
}

export const usePolicyStore = create<PolicyStore>((set) => ({
	policies: [],
	setPolicies: (policies: Policy[]): void => set({ policies })
}));
