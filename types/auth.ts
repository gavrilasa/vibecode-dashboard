// types/auth.ts

/**
 * Tipe data untuk user yang login, didapat dari response login.
 */
export interface User {
	id: string; // UUID dari backend
	username: string;
	email: string;
	role: "user" | "admin";
}

export interface LoginRequest {
	email: string;
	password: string;
}

/**
 * Tipe data untuk response body setelah login berhasil.
 */
export interface LoginResponse {
	id: string;
	username: string;
	email: string;
	role: "user" | "admin";
	token: string;
}

/**
 * Tipe data untuk request body saat registrasi.
 */
export interface RegisterRequest {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

/**
 * Tipe data untuk response body setelah registrasi berhasil.
 */
export interface RegisterResponse {
	message: string;
}

/**
 * Tipe data untuk payload yang di-decode dari JWT.
 */
export interface DecodedToken {
	sub: string; // Subject (user id)
	username: string;
	role: "user" | "admin";
	iat: number; // Issued at
	exp: number; // Expiration time
}
