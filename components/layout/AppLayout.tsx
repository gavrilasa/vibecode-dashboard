"use client";

import { Sidebar } from "./Sidebar";

interface AppLayoutProps {
	children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
	return (
		<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
			<Sidebar />
			<main className="flex-1 overflow-auto">
				<div className="px-8 py-12">{children}</div>
			</main>
		</div>
	);
}
