// app/admin/layout.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageLoader } from "@/components/common/PageLoader";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isAuthenticated, isAdmin, user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		// Middleware sudah melakukan proteksi utama,
		// ini sebagai lapisan pengaman tambahan di client-side.
		if (!isAuthenticated) {
			router.push("/auth/login");
		} else if (!isAdmin) {
			router.push("/dashboard");
		}
	}, [isAuthenticated, isAdmin, router]);

	// Tampilkan loading spinner selama status auth belum terkonfirmasi
	// atau jika user bukan admin.
	if (!user || !isAdmin) {
		return <PageLoader />;
	}

	// Jika sudah terkonfirmasi sebagai admin, tampilkan layout dan kontennya.
	return <AppLayout>{children}</AppLayout>;
}
