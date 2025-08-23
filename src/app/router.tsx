import { AuthPage } from '@/pages/auth';
import { MainPage } from '@/pages/main';
import { Routes } from '@/shared/config';
import { createBrowserRouter, createRoutesFromChildren, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Layout } from '@/widgets/layout';
import { AppPage } from '@/pages/app/:id';
import { appLoader } from '@/entities/app';
import { ErrorPage } from '@/pages/error';
import { AppIssuesPage } from '@/pages/app/:id/issues';

export const router = createBrowserRouter(
	createRoutesFromChildren(
		<>
			<Route path={Routes.AUTH} element={<AuthPage />} />
			<Route
				path={Routes.MAIN}
				element={
					<ProtectedRoute>
						<Layout />
					</ProtectedRoute>
				}>
				<Route errorElement={<ErrorPage />} index element={<MainPage />} />
				<Route errorElement={<ErrorPage />} loader={appLoader} path={Routes.APP_PAGE} element={<AppPage />} />
				<Route errorElement={<ErrorPage />} loader={appLoader} path={Routes.APP_ISSUES} element={<AppIssuesPage />} />
			</Route>
		</>
	)
);
