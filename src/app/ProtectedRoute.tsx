import { useUserStore } from '@/entities/user';
import { InfoPage } from '@/pages/info';
import { useEffect, type JSX, type PropsWithChildren } from 'react';

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

	if (!isLoaded && !user) {
		return <></>;
	}

	if (!user && isLoaded) {
		return (
			<>
				<InfoPage />
			</>
		);
	}

	return <>{children}</>;
};
