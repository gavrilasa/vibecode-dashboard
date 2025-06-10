"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/features/auth/LoginForm";
import Image from "next/image";

export default function LoginPage() {
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
		<div className="min-h-screen flex items-center justify-center dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 bg-[url(https://storage.theaceundip.id/assets/compressed-bg-theace.webp)] bg-cover bg-center">
			<div className="w-full max-w-md space-y-4">
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

				<LoginForm />

				<div className="text-center">
					<p className="text-sm text-gray-300 dark:text-gray-400">
						Don&apos;t have an account?{" "}
						<Link
							href="/auth/register"
							className="font-medium text-primary hover:text-orange-500"
						>
							Register here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
