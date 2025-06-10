// lib/registration.ts

import { apiRequest } from "./api";
import {
	Registration,
	PaginatedRegistrations,
	CreateRegistrationRequest,
	UpdateRegistrationRequest,
	RegistrationResponse,
	UploadDocumentResponse,
} from "@/types/registration";

// ... (fungsi yang ada tidak diubah)

/**
 * Mengambil data pendaftaran milik user yang sedang login.
 * Mengembalikan array karena user bisa mendaftar di lebih dari satu kompetisi.
 * Endpoint: GET /registration/me
 */
export async function getMyRegistrations(): Promise<Registration[]> {
	return apiRequest<Registration[]>("/registration/me");
}

/**
 * Mengambil semua data pendaftaran dengan paginasi dan filter (HANYA UNTUK ADMIN).
 * Endpoint: GET /registration
 */
export async function getAllRegistrations(params: {
	page?: number;
	limit?: number;
	status?: string;
	competitionName?: string;
	teamName?: string;
}): Promise<PaginatedRegistrations> {
	const query = new URLSearchParams();
	if (params.page) query.append("page", params.page.toString());
	if (params.limit) query.append("limit", params.limit.toString());
	if (params.status && params.status !== "ALL")
		query.append("status", params.status);
	if (params.competitionName)
		query.append("competitionName", params.competitionName);
	if (params.teamName) query.append("teamName", params.teamName);

	const queryString = query.toString();
	return apiRequest<PaginatedRegistrations>(`/registration?${queryString}`);
}

/**
 * Mendaftarkan tim ke sebuah kompetisi dengan data lengkap.
 * Endpoint: POST /registration/register
 */
export async function registerForCompetition(
	data: CreateRegistrationRequest
): Promise<RegistrationResponse> {
	return apiRequest<RegistrationResponse>("/registration/register", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

export async function updateRegistration(
	data: UpdateRegistrationRequest
): Promise<RegistrationResponse> {
	return apiRequest<RegistrationResponse>("/registration/update", {
		method: "PUT",
		body: JSON.stringify(data),
	});
}

/**
 * Mengunggah dokumen untuk pendaftaran.
 * Endpoint: POST /registration/upload
 */
export async function uploadDocument(
	file: File,
	documentType: "VALIDATION" | "SPONSOR" | "PRELIMINARY" | "FINAL"
): Promise<UploadDocumentResponse> {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("documentType", documentType);

	return apiRequest<UploadDocumentResponse>("/registration/upload", {
		method: "POST",
		body: formData,
	});
}

// ================== FUNGSI BARU ==================

/**
 * Mengambil detail registrasi berdasarkan ID (HANYA UNTUK ADMIN).
 * Endpoint: GET /registration/:id
 */
export async function getRegistrationById(id: number): Promise<Registration> {
	return apiRequest<Registration>(`/registration/${id}`);
}

/**
 * Mengubah status registrasi (HANYA UNTUK ADMIN).
 * Endpoint: PATCH /admin/change-status
 */
export async function changeRegistrationStatus(payload: {
	registrationId: number;
	status: string;
}): Promise<void> {
	// Endpoint ini tidak memiliki body respons, jadi kita harapkan Tipe-nya `void`
	return apiRequest<void>("/admin/change-status", {
		method: "PATCH",
		body: JSON.stringify(payload),
	});
}
