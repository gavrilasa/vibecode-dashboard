import React from "react";

interface AuthLayoutProps {
	children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<div className="min-h-screen flex items-center justify-center dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 bg-[url(https://storage.theaceundip.id/assets/compressed-bg-theace.webp)] bg-cover bg-center">
			<div className="w-full max-w-md space-y-4">{children}</div>
		</div>
	);
}
