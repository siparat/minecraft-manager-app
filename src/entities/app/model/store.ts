import { create } from 'zustand';
import type { App, AppIssue, AppIssuesCounts } from './types';
import { getAppIssues } from '../api';
import { HTTPError } from 'ky';
import toast from 'react-hot-toast';

interface AppStore {
	app?: App;
	issuesCounts?: AppIssuesCounts;
	issues: AppIssue[];
	setIssues: (issues: AppIssue[]) => void;
	refetchIssues: () => Promise<void>;
	setIssuesCounts: (counts: AppIssuesCounts) => void;
	setApp: (app: App) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
	issues: [],
	setIssues: (issues: AppIssue[]): void => set({ issues }),
	setIssuesCounts: (counts: AppIssuesCounts): void => set({ issuesCounts: counts }),
	setApp: (app: App): void => set({ app }),
	refetchIssues: async (): Promise<void> => {
		try {
			const appId = get().app?.id;
			if (!appId) {
				return;
			}
			const updatedIssuesList = await getAppIssues(appId);
			set({ issues: updatedIssuesList });
		} catch (error) {
			if (error instanceof HTTPError) {
				toast.error(error.message);
			}
		}
	}
}));
