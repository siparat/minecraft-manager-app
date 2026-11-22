import { UserRole, type User } from './types';

export const isAdmin = (user?: User): boolean => user?.role === UserRole.ADMIN;

export const isManager = (user?: User): boolean => user?.role === UserRole.MANAGER;

export const isPartner = (user?: User): boolean => user?.role === UserRole.PARTNER;

// Роли, которые могут менять только созданные ими ресурсы. Сервер проверяет то же самое.
const hasOwnershipRestriction = (user?: User): boolean => isManager(user) || isPartner(user);

// Менеджер и партнёр могут менять только ресурсы, которые создали сами.
export const canManageOwned = (user: User | undefined, ownerId?: number | null): boolean =>
	isAdmin(user) || (hasOwnershipRestriction(user) && ownerId != null && ownerId === user?.id);

// Ограничение владением: остальные роли действие не ограничивает
export const canUseOwned = (user: User | undefined, ownerId?: number | null): boolean =>
	!hasOwnershipRestriction(user) || canManageOwned(user, ownerId);
