"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isAuthenticated, isAdmin } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/auth/login");
		} else if (!isAdmin) {
			router.push("/dashboard");
		}
	}, [isAuthenticated, isAdmin, router]);

	if (!isAuthenticated || !isAdmin) {
		return null;
	}

	return <AppLayout>{children}</AppLayout>;
}
