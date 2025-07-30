import { useUserStore } from '@/entities/user';
import { Routes } from '@/shared/config';
import { useEffect, type JSX, type PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: Required<PropsWithChildren>): JSX.Element => {
	const fetchUserInfo = useUserStore((state) => state.fetchUserInfo);
	const user = useUserStore((state) => state.user);
	const isLoaded = useUserStore((state) => state.isLoaded);

	useEffect(() => {
		if (user) {
			return;
		}
		fetchUserInfo();
	}, [user, fetchUserInfo]);

	if (!user && isLoaded) {
		return (
			<>
				<Navigate to={Routes.AUTH} replace />
			</>
		);
	}

	return <>{children}</>;
};
