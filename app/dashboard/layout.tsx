// app/dashboard/layout.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration";
import { AppLayout } from "@/components/layout/AppLayout";
import { Loader2 } from "lucide-react";

/**
 * Layout ini berfungsi sebagai "gatekeeper" untuk semua halaman di bawah /dashboard.
 * Ia akan memeriksa apakah user sudah terdaftar di sebuah kompetisi.
 * Jika belum, user akan diarahkan ke halaman pemilihan kompetisi.
 */
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const { registrations, loading, fetchMyRegistrations } = useRegistration();

	// 1. Ambil data registrasi user saat komponen pertama kali dimuat
	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	// 2. Lakukan pengecekan dan redirect setelah data selesai diambil
	useEffect(() => {
		// Jangan lakukan apa-apa jika masih dalam proses loading
		if (loading) {
			return;
		}

		// Setelah loading selesai, periksa hasil `registrations`
		// Jika hasilnya adalah array kosong, berarti user belum terdaftar di kompetisi manapun.
		if (!loading && registrations && registrations.length === 0) {
			router.push("/competition/select");
		}
	}, [loading, registrations, router]);

	// 3. Tampilkan layar loading selama pengecekan berlangsung
	// Ini mencegah "flash" konten dashboard sebelum redirect.
	if (loading || !registrations) {
		return (
			<div className="flex h-screen w-full items-center justify-center bg-background">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	// 4. Jika user memiliki registrasi (array tidak kosong), tampilkan layout dan konten halaman
	if (registrations.length > 0) {
		return <AppLayout>{children}</AppLayout>;
	}

	// Fallback, seharusnya tidak pernah tercapai jika logika di atas benar.
	// Ini juga akan menampilkan loading screen selama proses redirect.
	return (
		<div className="flex h-screen w-full items-center justify-center bg-background">
			<Loader2 className="h-8 w-8 animate-spin text-primary" />
		</div>
	);
}
