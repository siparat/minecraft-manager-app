export enum UserRole {
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
	BUILDER = 'BUILDER',
	PARTNER = 'PARTNER'
}

export interface User {
	id: number;
	username: string;
	role: UserRole;
}
