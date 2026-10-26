import { useUserStore } from '@/entities/user';
import { UserRole } from '@/entities/user/model';
import { type JSX, type PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
	roles?: UserRole[];
}

export const ProtectedElement = ({ children, roles = [UserRole.ADMIN] }: Props): JSX.Element => {
	const user = useUserStore((state) => state.user);

	if (user && roles.includes(user.role)) {
		return <>{children}</>;
	}

	return <></>;
};
