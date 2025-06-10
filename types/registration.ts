// types/registration.ts
import { Competition } from "./competition";
import { Team } from "./team";
import { DOCUMENT_TYPE } from "@/lib/constants";

/**
 * Status Registrasi
 * Merepresentasikan status pendaftaran sebuah tim dalam kompetisi.
 */
export const REGISTRATION_STATUS = {
	PENDING: "PENDING",
	APPROVED: "APPROVED",
	REJECTED: "REJECTED",
	PRELIMINARY: "PRELIMINARY", // Status baru
	FINAL: "FINAL", // Status baru
} as const;

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
	type: (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE];
}

/**
 * Tipe data utama untuk sebuah pendaftaran.
 * Diperbarui sesuai dengan respons GET /registration/:id
 */
export interface Registration {
	id: number;
	userId: string;
	teamId: string;
	competitionId: number;
	status: (typeof REGISTRATION_STATUS)[keyof typeof REGISTRATION_STATUS];
	reviewedBy: string | null;
	reviewedAt: string | null;
	competition: Omit<Competition, "batches">;
	team: Omit<Team, "competition">; // Disesuaikan dengan respons baru
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
