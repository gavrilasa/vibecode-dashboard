// store/auth-store.ts

import { create } from "zustand";
import { User, LoginResponse, DecodedToken } from "@/types/auth";
import { getAuthCookie, removeAuthCookie, decodeToken } from "@/lib/auth";

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isAdmin: boolean;
	setAuth: (loginResponse: LoginResponse) => void;
	logout: () => void;
	initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	token: null,
	isAuthenticated: false,
	isAdmin: false,

	setAuth: (loginResponse: LoginResponse) => {
		const { token, ...userData } = loginResponse;
		set({
			user: userData,
			token: token,
			isAuthenticated: true,
			isAdmin: userData.role === "admin",
		});
	},

	logout: () => {
		removeAuthCookie();
		set({
			user: null,
			token: null,
			isAuthenticated: false,
			isAdmin: false,
		});
	},

	initializeAuth: () => {
		const token = getAuthCookie();
		if (token) {
			const decoded: DecodedToken | null = decodeToken(token);
			if (decoded && decoded.exp * 1000 > Date.now()) {
				set({
					user: {
						id: decoded.sub,
						username: decoded.username,
						email: "", // Email tidak ada di token, hanya di response login
						role: decoded.role,
					},
					token,
					isAuthenticated: true,
					isAdmin: decoded.role === "admin",
				});
			} else {
				removeAuthCookie();
				set({
					user: null,
					token: null,
					isAuthenticated: false,
					isAdmin: false,
				});
			}
		}
	},
}));
