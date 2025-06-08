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
import { useRegistration } from "@/hooks/useRegistration";
import { useState, useEffect, useMemo } from "react";

interface SidebarProps {
	className?: string;
}

// Menu dasar untuk semua user
const baseUserMenuItems = [
	{ title: "Dashboard", href: "/dashboard", icon: BarChart3 },
	{ title: "Biodata", href: "/dashboard/biodata", icon: User },
];

// Menu untuk admin
const adminMenuItems = [
	{ title: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
	{ title: "Registrations", href: "/admin/registrations", icon: FileText },
	{ title: "Teams", href: "/admin/teams", icon: Users },
];

export function Sidebar({ className }: SidebarProps) {
	const pathname = usePathname();
	const { user, logout } = useAuth(); // isAdmin tidak perlu diambil langsung, sudah ada di user.role
	const { registrations, fetchMyRegistrations } = useRegistration();
	const [isMobileOpen, setIsMobileOpen] = useState(false);

	const isAdmin = user?.role === "admin";

	useEffect(() => {
		// Hanya fetch jika bukan admin dan ada user
		if (user && !isAdmin) {
			fetchMyRegistrations();
		}
	}, [user, isAdmin, fetchMyRegistrations]);

	const menuItems = useMemo(() => {
		if (isAdmin) {
			return adminMenuItems;
		}

		let dynamicUserMenuItems = [...baseUserMenuItems];
		const userRegistration =
			registrations && registrations.length > 0 ? registrations[0] : null;

		if (userRegistration) {
			const competitionName = userRegistration.competition.name.toLowerCase();
			// Hanya tampilkan menu upload jika nama kompetisi mengandung "ui/ux"
			if (competitionName.includes("ui/ux")) {
				// Sisipkan menu "Upload Berkas" setelah "Biodata"
				const biodataIndex = dynamicUserMenuItems.findIndex(
					(item) => item.href === "/dashboard/biodata"
				);
				dynamicUserMenuItems.splice(biodataIndex + 1, 0, {
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

			{isMobileOpen && (
				<div
					className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
					onClick={() => setIsMobileOpen(false)}
				/>
			)}

			<div
				className={cn(
					"fixed left-0 top-0 z-40 h-full w-64 bg-background border-r transition-transform duration-300 ease-in-out",
					isMobileOpen ? "translate-x-0" : "-translate-x-full",
					"md:translate-x-0 md:static md:h-screen",
					className
				)}
			>
				<div className="flex h-full flex-col">
					<div className="flex h-16 items-center justify-center border-b">
						<Link
							href={isAdmin ? "/admin/dashboard" : "/dashboard"}
							className="flex items-center space-x-2"
						>
							<Trophy className="h-8 w-8 text-primary" />
							<span className="text-xl font-bold">The Ace</span>
						</Link>
					</div>

					<div className="border-b p-4">
						<div className="flex items-center space-x-3">
							<div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
								<User className="h-6 w-6" />
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium truncate">
									{user?.username || "User"}
								</p>
								<p className="text-xs text-muted-foreground truncate">
									{/* SEKARANG AKAN TAMPIL DENGAN BENAR */}
									{user?.email || "user@example.com"}
								</p>
							</div>
						</div>
					</div>

					<nav className="flex-1 space-y-1 p-2">
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
											? "bg-accent text-accent-foreground"
											: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
									)}
								>
									<item.icon className="h-5 w-5" />
									<span>{item.title}</span>
								</Link>
							);
						})}
					</nav>

					<div className="border-t p-2">
						<Button
							variant="ghost"
							className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
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
