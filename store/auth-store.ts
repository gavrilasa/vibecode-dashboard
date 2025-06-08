// store/auth-store.ts

"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, LoginResponse, DecodedToken } from "@/types/auth";
import { getAuthCookie, removeAuthCookie, decodeToken } from "@/lib/auth";

interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isAdmin: boolean; // PERBAIKAN: Kembalikan `isAdmin` ke dalam state
	setAuth: (loginResponse: LoginResponse) => void;
	logout: () => void;
	initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			token: null,
			isAuthenticated: false,
			isAdmin: false, // PERBAIKAN: Tambahkan nilai awal untuk `isAdmin`

			setAuth: (loginResponse: LoginResponse) => {
				const { token, ...userData } = loginResponse;
				set({
					user: userData,
					token: token,
					isAuthenticated: true,
					// Sekarang ini valid karena `isAdmin` ada di state
					isAdmin: userData.role === "admin",
				});
			},

			logout: () => {
				removeAuthCookie();
				set({
					user: null,
					token: null,
					isAuthenticated: false,
					// Sekarang ini valid karena `isAdmin` ada di state
					isAdmin: false,
				});
			},

			initializeAuth: () => {
				const token = getAuthCookie();
				if (token) {
					const decoded: DecodedToken | null = decodeToken(token);
					if (decoded && decoded.exp * 1000 > Date.now()) {
						// Saat inisialisasi, kita juga perlu set `isAuthenticated` dan `isAdmin`
						const isAdmin = decoded.role === "admin";
						const userFromToken: User = {
							id: decoded.sub,
							username: decoded.username,
							// Email tidak ada di token, ambil dari state yang tersimpan di localStorage
							email: get().user?.email || "",
							role: decoded.role,
						};

						set({
							isAuthenticated: true,
							token: token,
							isAdmin: isAdmin,
							user: userFromToken,
						});
					} else {
						get().logout();
					}
				} else {
					get().logout();
				}
			},
		}),
		{
			name: "auth-storage",
			storage: createJSONStorage(() => localStorage),
			// PERBAIKAN: Simpan juga `isAdmin` agar state konsisten saat refresh
			partialize: (state) => ({
				user: state.user,
				token: state.token,
				isAdmin: state.isAdmin,
			}),
		}
	)
);
