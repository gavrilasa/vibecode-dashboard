// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types/auth";
import { ROLES, APP_ROUTES } from "@/lib/constants";

/**
 * Memeriksa apakah token JWT sudah kedaluwarsa.
 * @param token - String token JWT.
 * @returns boolean - True jika kedaluwarsa, false jika masih valid.
 */
function isTokenExpired(token: string): boolean {
	try {
		const decoded: DecodedToken = jwtDecode(token);
		const currentTime = Date.now() / 1000;
		return decoded.exp < currentTime;
	} catch (error) {
		// Jika token tidak valid atau tidak bisa di-decode, anggap saja kedaluwarsa.
		return true;
	}
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("auth-token")?.value;

	// Definisikan rute publik yang tidak memerlukan otentikasi.
	const publicRoutes = [
		APP_ROUTES.LOGIN,
		APP_ROUTES.REGISTER,
		APP_ROUTES.SENDING_EMAIL,
		APP_ROUTES.VERIFY_EMAIL,
		APP_ROUTES.HOME,
		APP_ROUTES.CTF_PAGE,
		APP_ROUTES.UIUX_PAGE,
		APP_ROUTES.LINEFOLLOWER_PAGE,
	];

	// Izinkan akses ke rute publik.
	if (publicRoutes.includes(pathname)) {
		return NextResponse.next();
	}

	// Jika tidak ada token atau token sudah kedaluwarsa, redirect ke halaman login.
	if (!token || isTokenExpired(token)) {
		const loginUrl = new URL(APP_ROUTES.LOGIN, request.url);
		const response = NextResponse.redirect(loginUrl);

		// Pastikan cookie yang tidak valid dihapus.
		response.cookies.delete("auth-token");
		return response;
	}

	// Jika token ada dan valid, periksa role untuk otorisasi.
	try {
		const decoded: DecodedToken = jwtDecode(token);
		const isAdmin = decoded.role === ROLES.ADMIN;

		// Jika admin mencoba mengakses dashboard user, arahkan ke dashboard admin.
		if (isAdmin && pathname.startsWith("/dashboard")) {
			return NextResponse.redirect(
				new URL(APP_ROUTES.ADMIN_DASHBOARD, request.url)
			);
		}

		// Jika user biasa mencoba mengakses rute admin, arahkan ke dashboard user.
		if (!isAdmin && pathname.startsWith("/admin")) {
			return NextResponse.redirect(new URL(APP_ROUTES.DASHBOARD, request.url));
		}
	} catch (error) {
		// Jika terjadi error saat decode (seharusnya sudah ditangani isTokenExpired),
		// tetap redirect ke login sebagai fallback keamanan.
		const loginUrl = new URL("/auth/login", request.url);
		const response = NextResponse.redirect(loginUrl);
		response.cookies.delete("auth-token");
		return response;
	}

	// Jika semua pengecekan otentikasi dan otorisasi lolos, lanjutkan ke tujuan.
	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
