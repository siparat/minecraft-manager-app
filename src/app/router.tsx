import { AuthPage } from '@/pages/auth';
import { MainPage } from '@/pages/main';
import { Routes } from '@/shared/config';
import { createBrowserRouter, createRoutesFromChildren, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter(
	createRoutesFromChildren(
		<>
			<Route path={Routes.AUTH} element={<AuthPage />} />
			<Route
				path={Routes.MAIN}
				element={
					<ProtectedRoute>
						<aside>Layout</aside>
					</ProtectedRoute>
				}>
				<Route index element={<MainPage />}></Route>
			</Route>
		</>
	)
);
