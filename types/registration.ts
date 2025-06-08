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
