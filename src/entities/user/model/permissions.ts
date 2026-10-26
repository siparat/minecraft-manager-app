import { UserRole, type User } from './types';

export const isAdmin = (user?: User): boolean => user?.role === UserRole.ADMIN;

export const isManager = (user?: User): boolean => user?.role === UserRole.MANAGER;

// Менеджер может менять только ресурсы, которые создал сам. Сервер проверяет то же самое.
export const canManageOwned = (user: User | undefined, ownerId?: number | null): boolean =>
	isAdmin(user) || (isManager(user) && ownerId != null && ownerId === user?.id);

// Ограничение только для менеджера: остальные роли действие не ограничивает
export const canUseOwned = (user: User | undefined, ownerId?: number | null): boolean => !isManager(user) || canManageOwned(user, ownerId);
