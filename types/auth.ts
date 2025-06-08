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

// Competition Types
export interface Competition {
	id: number;
	name: string;
	description: string;
	maxMembers: number;
	startDate: string;
	endDate: string;
	batches: Batch[];
}

export interface Batch {
	id: number;
	competitionId: number;
	name: string;
	price: string;
	startDate: string;
	endDate: string;
}

// Registration Types
export interface Registration {
	id: number;
	userId: number;
	competitionId: number;
	status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface RegistrationRequest {
	competitionId: number;
}

export interface DocumentUpload {
	id: number;
	registrationId: number;
	filename: string;
	filepath: string;
	filetype: string;
	type: "VALIDATION";
}

// Team Types
export interface Team {
	id: string;
	name: string;
	competitionId?: number;
	competition?: {
		id: number;
		name: string;
		description?: string;
		maxMembers: number;
		startDate: string;
		endDate: string;
	};
}

export interface TeamRequest {
	name: string;
	competitionId: number;
}

export interface TeamUpdateRequest {
	name: string;
	competitionId: number;
}
