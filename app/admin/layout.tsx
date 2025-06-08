// app/admin/layout.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { Loader2 } from "lucide-react";

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
		return (
			<div className="flex h-screen w-full items-center justify-center bg-background">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	// Jika sudah terkonfirmasi sebagai admin, tampilkan layout dan kontennya.
	return <AppLayout>{children}</AppLayout>;
}
