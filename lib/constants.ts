/**
 * Role Pengguna
 * Digunakan untuk membedakan hak akses antara admin dan user biasa.
 */
export const ROLES = {
	ADMIN: "admin",
	USER: "user",
} as const;

/**
 * Status Registrasi
 * Merepresentasikan status pendaftaran sebuah tim dalam kompetisi.
 */
export const REGISTRATION_STATUS = {
	PENDING: "PENDING",
	APPROVED: "APPROVED",
	REJECTED: "REJECTED",
} as const;

/**
 * Tipe Dokumen
 * Digunakan untuk membedakan jenis file yang diunggah.
 */
export const DOCUMENT_TYPE = {
	VALIDATION: "VALIDATION",
	PRELIMINARY: "PENYISIHAN", // Menggunakan nama sesuai API
	FINAL: "FINAL",
} as const;

/**
 * Kunci Nama Kompetisi
 * Digunakan untuk logika khusus berdasarkan kompetisi.
 */
export const COMPETITION_KEYS = {
	UI_UX: "ui/ux",
	CTF: "ctf",
	FTL: "ftl",
} as const;

/**
 * Rute Aplikasi
 * Menyimpan path untuk navigasi agar terpusat.
 */
export const APP_ROUTES = {
	LOGIN: "/auth/login",
	REGISTER: "/auth/register",
	DASHBOARD: "/dashboard",
	ADMIN_DASHBOARD: "/admin/dashboard",
	ADMIN_REGISTRATIONS: "/admin/registrations",
	ADMIN_TEAMS: "/admin/teams",
	SELECT_COMPETITION: "/competition/select",
	BIODATA: "/dashboard/biodata",
	UPLOAD: "/dashboard/upload",
};
