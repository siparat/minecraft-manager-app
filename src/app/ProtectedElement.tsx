import { useUserStore } from '@/entities/user';
import { UserRole } from '@/entities/user/model';
import { type JSX, type PropsWithChildren } from 'react';

export const ProtectedElement = ({ children }: Required<PropsWithChildren>): JSX.Element => {
	const user = useUserStore((state) => state.user);

	if (user?.role == UserRole.ADMIN) {
		return <>{children}</>;
	}

	return <></>;
};
