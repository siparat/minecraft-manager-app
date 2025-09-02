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
import { AppSdkPage } from '@/pages/app/:id/sdk';
import { ModsPage } from '@/pages/mods';
import { modLoader } from '@/entities/mod';

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
				<Route errorElement={<ErrorPage />} loader={appLoader} path={Routes.APP_SDK} element={<AppSdkPage />} />
				<Route errorElement={<ErrorPage />} loader={modLoader} path={Routes.MODS} element={<ModsPage />} />
			</Route>
		</>
	)
);
