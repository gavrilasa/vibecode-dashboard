// lib/auth.ts

import { jwtDecode } from "jwt-decode";
import { apiRequest } from "./api";
import {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
	DecodedToken,
} from "@/types/auth";

export function setAuthCookie(token: string): void {
	if (typeof window !== "undefined") {
		document.cookie = `auth-token=${token}; path=/; max-age=86400; SameSite=Lax`;
	}
}

export function getAuthCookie(): string | null {
	if (typeof window !== "undefined") {
		const name = "auth-token=";
		const ca = document.cookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
	}
	return null;
}

export function removeAuthCookie(): void {
	if (typeof window !== "undefined") {
		document.cookie =
			"auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	}
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
	const response = await apiRequest<LoginResponse>("/auth/login", {
		method: "POST",
		body: JSON.stringify(credentials),
	});

	if (response.token) {
		setAuthCookie(response.token);
	}

	return response;
}

export async function register(
	userData: RegisterRequest
): Promise<RegisterResponse> {
	return apiRequest<RegisterResponse>("/auth/register", {
		method: "POST",
		body: JSON.stringify(userData),
	});
}

export function decodeToken(token: string): DecodedToken | null {
	try {
		const decoded: DecodedToken = jwtDecode(token);
		return decoded;
	} catch (error) {
		console.error("Failed to decode token:", error);
		return null;
	}
}
