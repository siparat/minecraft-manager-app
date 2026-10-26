export enum UserRole {
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
	BUILDER = 'BUILDER'
}

export interface User {
	id: number;
	username: string;
	role: UserRole;
}
