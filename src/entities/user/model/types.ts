export enum UserRole {
	ADMIN = 'ADMIN',
	BUILDER = 'BUILDER'
}

export interface User {
	id: number;
	username: string;
	role: UserRole;
}
