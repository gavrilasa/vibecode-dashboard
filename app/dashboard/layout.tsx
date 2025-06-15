// app/dashboard/layout.tsx

"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageLoader } from "@/components/common/PageLoader";
import { APP_ROUTES } from "@/lib/constants";
import { toast } from "sonner";
import {
	canAccessUploadPenyisihan,
	canAccessUploadFinal,
	canEditRegistration,
} from "@/lib/permissions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const pathname = usePathname();
	const { isAuthenticated } = useAuth();
	const { registrations, loading, error, fetchMyRegistrations } =
		useRegistration();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	// State 1: Tampilkan loader selama proses fetch data berlangsung.
	if (loading) {
		return <PageLoader message="Verifying your registration status..." />;
	}

	// State 2: Tangani jika terjadi error saat fetch data.
	if (error) {
		return (
			<div className="flex h-screen w-full items-center justify-center p-4">
				<Alert variant="destructive" className="max-w-md">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error Loading Data</AlertTitle>
					<AlertDescription>
						{error}
						<Button
							variant="destructive"
							onClick={() => fetchMyRegistrations()}
							className="mt-4 w-full"
						>
							Try Again
						</Button>
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	// State 3: Data sudah ada (atau tidak ada), jalankan logika utama.
	if (!loading && registrations) {
		const registration = registrations[0] || null;

		// Aturan 3a: Jika user tidak terdaftar, redirect ke pemilihan kompetisi.
		if (!registration && pathname !== APP_ROUTES.SELECT_COMPETITION) {
			router.push(APP_ROUTES.SELECT_COMPETITION);
			return <PageLoader message="Redirecting..." />; // Tampilkan loader selama redirect
		}

		// Aturan 3b: Jika user terdaftar, cek izin halaman spesifik.
		if (registration) {
			const pageChecks = [
				{
					path: APP_ROUTES.UPLOAD_PENYISIHAN,
					isAllowed: canAccessUploadPenyisihan(registration),
					redirect: APP_ROUTES.DASHBOARD,
					message:
						"You are not eligible to access the preliminary submission page.",
				},
				{
					path: APP_ROUTES.UPLOAD_FINAL,
					isAllowed: canAccessUploadFinal(registration),
					redirect: APP_ROUTES.DASHBOARD,
					message: "This page is for UI/UX finalists only.",
				},
				{
					path: APP_ROUTES.BIODATA_EDIT,
					isAllowed: canEditRegistration(registration),
					redirect: APP_ROUTES.BIODATA,
					message: `Your registration with status "${registration.status}" cannot be edited.`,
				},
			];

			for (const check of pageChecks) {
				if (pathname === check.path && !check.isAllowed) {
					toast.error("Access Denied", { description: check.message });
					router.push(check.redirect);
					return <PageLoader message="Redirecting..." />;
				}
			}
		}
	}

	// Jika lolos semua pengecekan, render layout dan halaman yang dituju.
	// Jika tidak terdaftar, hanya render {children} (halaman pemilihan kompetisi)
	if (registrations && registrations.length === 0) {
		return <>{children}</>;
	}

	// Jika terdaftar, bungkus dengan AppLayout.
	return <AppLayout>{children}</AppLayout>;
}
