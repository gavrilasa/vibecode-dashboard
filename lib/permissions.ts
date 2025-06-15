// lib/permissions.ts

import { Registration } from "@/types/registration";
import { COMPETITION_KEYS, REGISTRATION_STATUS } from "./constants";

// Definisikan tipe data untuk status secara eksplisit sebagai konstanta
// Ini akan menyelesaikan masalah type inference pada method .includes()
const EDITABLE_STATUSES: readonly string[] = [
	REGISTRATION_STATUS.PENDING,
	REGISTRATION_STATUS.REJECTED,
];

const PRELIMINARY_ACCESS_STATUSES: readonly string[] = [
	REGISTRATION_STATUS.APPROVED,
	REGISTRATION_STATUS.PRELIMINARY,
	REGISTRATION_STATUS.FINAL,
	REGISTRATION_STATUS.ELIMINATED,
];

const PRELIMINARY_UPLOAD_STATUSES: readonly string[] = [
	REGISTRATION_STATUS.APPROVED,
	REGISTRATION_STATUS.PRELIMINARY,
];

const FINAL_ACCESS_STATUSES: readonly string[] = [REGISTRATION_STATUS.FINAL];

/**
 * Memeriksa apakah biodata dan dokumen pendaftaran dapat diedit.
 * @param registration - Objek registrasi pengguna.
 * @returns {boolean} True jika bisa diedit.
 */
export const canEditRegistration = (
	registration: Registration | null
): boolean => {
	if (!registration) return false;
	return EDITABLE_STATUSES.includes(registration.status);
};

/**
 * Memeriksa apakah pengguna dapat mengakses halaman upload berkas pendaftaran.
 * @param registration - Objek registrasi pengguna.
 * @returns {boolean} True jika bisa mengakses.
 */
export const canAccessUploadBerkas = (
	registration: Registration | null
): boolean => {
	if (!registration) return false;
	// Semua status setelah mendaftar boleh melihat halaman ini.
	return true;
};

/**
 * Memeriksa apakah pengguna dapat mengakses halaman upload tahap penyisihan.
 * @param registration - Objek registrasi pengguna.
 * @returns {boolean} True jika bisa mengakses.
 */
export const canAccessUploadPenyisihan = (
	registration: Registration | null
): boolean => {
	if (!registration) return false;

	const isUIUX = registration.competition.name
		.toLowerCase()
		.includes(COMPETITION_KEYS.UI_UX);

	return isUIUX && PRELIMINARY_ACCESS_STATUSES.includes(registration.status);
};

/**
 * Memeriksa apakah pengguna dapat mengunggah berkas penyisihan.
 * @param registration - Objek registrasi pengguna.
 * @returns {boolean} True jika bisa mengunggah.
 */
export const canUploadPenyisihan = (
	registration: Registration | null
): boolean => {
	if (!registration) return false;

	const isUIUX = registration.competition.name
		.toLowerCase()
		.includes(COMPETITION_KEYS.UI_UX);

	return isUIUX && PRELIMINARY_UPLOAD_STATUSES.includes(registration.status);
};

export const canAccessUploadFinal = (
	registration: Registration | null
): boolean => {
	if (!registration) return false;

	const isUIUX = registration.competition.name
		.toLowerCase()
		.includes(COMPETITION_KEYS.UI_UX);

	return isUIUX && FINAL_ACCESS_STATUSES.includes(registration.status);
};

export const canUploadFinal = (registration: Registration | null): boolean => {
	if (!registration) return false;

	const isFinalist = registration.status === REGISTRATION_STATUS.FINAL;

	const isUIUX = registration.competition.name
		.toLowerCase()
		.includes(COMPETITION_KEYS.UI_UX);

	return isUIUX && isFinalist;
};
