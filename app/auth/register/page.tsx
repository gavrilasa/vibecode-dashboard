"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { RegisterForm } from "@/components/features/auth/RegisterForm";
import Image from "next/image";
import { AuthLayout } from "@/components/layout/AuthLayout";

export default function RegisterPage() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/dashboard");
		}
	}, [isAuthenticated, router]);

	if (isAuthenticated) {
		return null;
	}

	return (
		<AuthLayout>
			<div className="text-center">
				<div className="flex justify-center">
					<Image
						src={"https://storage.theaceundip.id/assets/TheAce-Mini-Logo.png"}
						height={128}
						width={128}
						alt="Logo The Ace"
					/>
				</div>
			</div>

			<RegisterForm />

			<div className="text-center">
				<p className="text-sm text-gray-300 dark:text-gray-400">
					Already have an account?{" "}
					<Link
						href="/auth/login"
						className="font-medium text-primary hover:text-orange-500"
					>
						Sign in here
					</Link>
				</p>
			</div>
		</AuthLayout>
	);
}
