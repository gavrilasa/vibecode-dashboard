// components/layout/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Trophy,
	User,
	Clock,
	Upload,
	Bell,
	LogOut,
	BarChart3,
	Users,
	FileText,
	Menu,
	X,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration"; // 1. Impor hook registrasi
import { useState, useEffect, useMemo } from "react"; // 2. Impor useEffect dan useMemo

interface SidebarProps {
	className?: string;
}

// Menu dasar untuk semua user
const baseUserMenuItems = [
	{
		title: "Dashboard",
		href: "/dashboard",
		icon: BarChart3,
	},
	{
		title: "Biodata",
		href: "/dashboard/biodata",
		icon: User,
	},
];

// Menu untuk admin
const adminMenuItems = [
	{
		title: "Dashboard",
		href: "/admin/dashboard",
		icon: BarChart3,
	},
	{
		title: "Registrations",
		href: "/admin/registrations",
		icon: FileText,
	},
	{
		title: "Teams",
		href: "/admin/teams",
		icon: Users,
	},
];

export function Sidebar({ className }: SidebarProps) {
	const pathname = usePathname();
	const { user, logout, isAdmin } = useAuth();
	const { registrations, fetchMyRegistrations } = useRegistration(); // 3. Gunakan hook registrasi
	const [isMobileOpen, setIsMobileOpen] = useState(false);

	// 4. Ambil data registrasi saat komponen dimuat
	useEffect(() => {
		if (!isAdmin) {
			fetchMyRegistrations();
		}
	}, [isAdmin, fetchMyRegistrations]);

	// 5. Buat menu item secara dinamis berdasarkan data registrasi
	const menuItems = useMemo(() => {
		if (isAdmin) {
			return adminMenuItems;
		}

		const dynamicUserMenuItems = [...baseUserMenuItems];
		const userRegistration =
			registrations && registrations.length > 0 ? registrations[0] : null;

		if (userRegistration) {
			const competitionName = userRegistration.competition.name.toLowerCase();
			if (competitionName.includes("ui/ux")) {
				const countdownIndex = dynamicUserMenuItems.findIndex(
					(item) => item.href === "/dashboard/countdown"
				);
				dynamicUserMenuItems.splice(countdownIndex + 3, 0, {
					title: "Upload Berkas",
					href: "/dashboard/upload",
					icon: Upload,
				});
			}
		}

		return dynamicUserMenuItems;
	}, [isAdmin, registrations]);

	const handleLogout = () => {
		logout();
		setIsMobileOpen(false);
	};

	return (
		<>
			{/* Mobile menu button */}
			<Button
				variant="ghost"
				size="icon"
				className="fixed top-4 left-4 z-50 md:hidden"
				onClick={() => setIsMobileOpen(!isMobileOpen)}
			>
				{isMobileOpen ? (
					<X className="h-6 w-6" />
				) : (
					<Menu className="h-6 w-6" />
				)}
			</Button>

			{/* Mobile overlay */}
			{isMobileOpen && (
				<div
					className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
					onClick={() => setIsMobileOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={cn(
					"fixed left-0 top-0 z-40 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out",
					isMobileOpen ? "translate-x-0" : "-translate-x-full",
					"md:translate-x-0 md:static md:h-screen",
					className
				)}
			>
				<div className="flex h-full flex-col">
					{/* Logo */}
					<div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-800">
						<div className="flex items-center space-x-2">
							<Trophy className="h-8 w-8 text-blue-600" />
							<span className="text-xl font-bold text-gray-900 dark:text-white">
								The Ace
							</span>
						</div>
					</div>

					{/* User info */}
					<div className="border-b border-gray-200 dark:border-gray-800 p-4">
						<div className="flex items-center space-x-3">
							<div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
								<User className="h-6 w-6 text-white" />
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
									{/* PERBAIKAN: Gunakan `user.username` bukan `user.name` */}
									{user?.username || "User"}
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400 truncate">
									{user?.email || "user@example.com"}
								</p>
							</div>
						</div>
					</div>

					{/* Navigation */}
					<nav className="flex-1 space-y-1 p-4">
						{menuItems.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsMobileOpen(false)}
									className={cn(
										"flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
										isActive
											? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
											: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
									)}
								>
									<item.icon className="h-5 w-5" />
									<span>{item.title}</span>
								</Link>
							);
						})}
					</nav>

					{/* Logout */}
					<div className="border-t border-gray-200 dark:border-gray-800 p-4">
						<Button
							variant="ghost"
							className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
							onClick={handleLogout}
						>
							<LogOut className="h-5 w-5 mr-3" />
							Logout
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
