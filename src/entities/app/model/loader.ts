import type { LoaderFunctionArgs } from 'react-router-dom';
import type { App, AppIssue, AppIssuesCounts } from './types';
import { getApp, getAppIssues, getAppIssuesCounts } from '../api';
import { useAppStore } from './store';

export interface AppLoaderData {
	app: App;
	issuesCounts: AppIssuesCounts;
	issues: AppIssue[];
}

export const appLoader = async (args: LoaderFunctionArgs): Promise<AppLoaderData> => {
	const { setApp, setIssues, setIssuesCounts } = useAppStore.getState();

	const id = Number(args.params.id);
	if (Number.isNaN(id)) {
		throw new Error('Приложение с таким идентификатором отсутствует');
	}

	const app = await getApp(id);
	setApp(app);

	const issuesCounts = await getAppIssuesCounts(app.id);
	setIssuesCounts(issuesCounts);

	const issues = await getAppIssues(app.id);
	setIssues(issues);

	return { app, issuesCounts, issues };
};
