// Auth Types
export interface User {
	id: number;
	username: string;
	email: string;
	isAdmin?: boolean;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
}

export interface RegisterRequest {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface RegisterResponse {
	message: string;
}
