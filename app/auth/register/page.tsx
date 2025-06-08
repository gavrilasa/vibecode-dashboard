"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { RegisterForm } from "@/components/features/auth/RegisterForm";
import { Trophy } from "lucide-react";

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
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				<div className="text-center">
					<div className="flex justify-center">
						<Trophy className="h-12 w-12 text-blue-600" />
					</div>
					<h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
						The Ace
					</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						Create your account
					</p>
				</div>

				<RegisterForm />

				<div className="text-center">
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Already have an account?{" "}
						<Link
							href="/auth/login"
							className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
						>
							Sign in here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
