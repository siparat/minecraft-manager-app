import { AuthPage } from '@/pages/auth';
import { MainPage } from '@/pages/main';
import { Routes } from '@/shared/config';
import { createBrowserRouter, createRoutesFromChildren, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Layout } from '@/widgets/layout';

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
				<Route index element={<MainPage />}></Route>
			</Route>
		</>
	)
);
