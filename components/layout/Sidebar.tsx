// components/layout/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	User,
	Upload,
	LogOut,
	BarChart3,
	Users,
	FileText,
	Menu,
	X,
	Trophy,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration";
import { useState, useEffect, useMemo } from "react";
import { APP_ROUTES, COMPETITION_KEYS, ROLES } from "@/lib/constants";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
	canAccessUploadFinal,
	canAccessUploadPenyisihan,
} from "@/lib/permissions";

interface SidebarProps {
	className?: string;
}

const baseUserMenuItems = [
	{ title: "Dashboard", href: "/dashboard", icon: BarChart3 },
	{ title: "Biodata", href: "/dashboard/biodata", icon: User },
];

const adminMenuItems = [
	{ title: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
	{ title: "Registrations", href: "/admin/registrations", icon: FileText },
	{ title: "Teams", href: "/admin/teams", icon: Users },
];

export function Sidebar({ className }: SidebarProps) {
	const pathname = usePathname();
	const { user, logout } = useAuth();
	const { registrations, fetchMyRegistrations } = useRegistration();
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const router = useRouter();

	const isAdmin = user?.role === ROLES.ADMIN;

	useEffect(() => {
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
			dynamicUserMenuItems.push({
				title: "Berkas Pendaftaran",
				href: APP_ROUTES.UPLOAD_BERKAS,
				icon: Upload,
			});

			if (canAccessUploadPenyisihan(userRegistration)) {
				dynamicUserMenuItems.push({
					title: "Pengumpulan Karya",
					href: APP_ROUTES.UPLOAD_PENYISIHAN,
					icon: FileText,
				});
			}

			if (canAccessUploadFinal(userRegistration)) {
				dynamicUserMenuItems.push({
					title: "Berkas Finalis",
					href: APP_ROUTES.UPLOAD_FINAL,
					icon: Trophy,
				});
			}
		}

		return dynamicUserMenuItems;
	}, [isAdmin, registrations]);

	const profileImageUrl = useMemo(() => {
		if (isAdmin || !registrations || registrations.length === 0) {
			return null;
		}

		const userRegistration = registrations[0];
		const competitionName = userRegistration.competition.name.toLowerCase();

		if (competitionName.includes(COMPETITION_KEYS.UI_UX)) {
			return "https://storage.theaceundip.id/assets/profile-uiux.png";
		}
		if (competitionName.includes(COMPETITION_KEYS.CTF)) {
			return "https://storage.theaceundip.id/assets/profile-ctf.png";
		}
		if (competitionName.includes(COMPETITION_KEYS.FTL)) {
			return "https://storage.theaceundip.id/assets/profile-ftl.png";
		}

		return null;
	}, [isAdmin, registrations]);

	const handleLogoutConfirm = () => {
		logout();
		setShowLogoutModal(false);
		router.push("/auth/login");
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
					<div className="flex h-20 items-center justify-center border-b">
						<Link
							href={isAdmin ? "/admin/dashboard" : "/dashboard"}
							className="flex items-center space-x-2"
						>
							<Image
								src={
									"https://storage.theaceundip.id/assets/TheAce-Mini-Logo.png"
								}
								height={36}
								width={36}
								alt="Logo The Ace"
								className="object-cover size-max"
							/>
							<span className="text-xl font-bold text-secondary">
								Dashboard
							</span>
						</Link>
					</div>

					<div className="border-b p-4">
						<div className="flex items-center space-x-3">
							{profileImageUrl ? (
								<Image
									src={profileImageUrl}
									alt="Profile Picture"
									width={40}
									height={40}
									className="rounded-full h-10 w-10 object-cover"
								/>
							) : (
								<div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
									<User className="h-6 w-6" />
								</div>
							)}
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium truncate">
									{user?.username || "User"}
								</p>
								<p className="text-xs text-muted-foreground truncate">
									{user?.email || "user@example.com"}
								</p>
							</div>
						</div>
					</div>

					<nav className="flex-1 space-y-2 px-2 py-4">
						{menuItems.map((item) => {
							const isActive = pathname === item.href;
							return (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsMobileOpen(false)}
									className={cn(
										"flex items-center space-x-3 rounded-lg p-3 text-sm font-medium transition-colors",
										isActive
											? "bg-accent text-accent-foreground"
											: "py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
							onClick={() => setShowLogoutModal(true)}
						>
							<LogOut className="h-5 w-5 mr-3" />
							Logout
						</Button>
					</div>
				</div>
			</div>

			<AlertDialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you sure you want to log out?
						</AlertDialogTitle>
						<AlertDialogDescription>
							You will be redirected to the login page.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setShowLogoutModal(false)}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleLogoutConfirm}
							className="text-white bg-red-600 hover:bg-red-700"
						>
							Logout
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
