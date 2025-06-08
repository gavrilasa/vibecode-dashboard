// types/registration.ts
import { Competition } from "./competition";
import { Team } from "./team";

/**
 * Tipe data untuk detail anggota tim dalam pendaftaran.
 */
export interface Member {
	id: number;
	registrationDetailsId: number;
	memberName: string;
	memberEmail: string;
	memberDiscordUsername: string;
	memberStudentId: string;
	memberPhone: string;
}

/**
 * Tipe data untuk detail pendaftaran.
 */
export interface RegistrationDetails {
	institutionName: string;
	members: Member[];
}

/**
 * Tipe data untuk dokumen yang diunggah.
 */
export interface DocumentUpload {
	id: number;
	registrationId: number;
	filename: string;
	filepath: string;
	filetype: string;
	type: "VALIDATION" | "PENYISIHAN" | "FINAL";
}

/**
 * Tipe data utama untuk sebuah pendaftaran.
 */
export interface Registration {
	id: number;
	userId: string;
	teamId: string;
	competitionId: number;
	status: "PENDING" | "APPROVED" | "REJECTED";
	reviewedBy: string | null;
	reviewedAt: string | null;
	competition: Omit<Competition, "batches">; // Kompetisi tidak menyertakan batches di sini
	team: Omit<Team, "competition">;
	documents: DocumentUpload[];
	details: RegistrationDetails;
}

/**
 * Tipe data untuk response paginasi dari GET /registration (Admin).
 */
export interface PaginatedRegistrations {
	data: Registration[];
	total: number;
	page: number;
	pageCount: number;
}

/**
 * Tipe data untuk request body saat mendaftar kompetisi.
 */
export interface CreateRegistrationRequest {
	institutionName: string;
	memberCount: number;
	memberNames: string[];
	memberEmails: string[];
	memberDiscordUsernames: string[];
	memberStudentIds: string[];
	memberPhones: string[];
}

/**
 * Tipe data untuk response setelah upload dokumen.
 */
export type UploadDocumentResponse = DocumentUpload;
