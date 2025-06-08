// app/dashboard/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { CountdownCard } from "@/components/dashboard/CountdownCard";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration";
// useTeam tidak lagi digunakan untuk fetch data
import {
	Trophy,
	Users,
	Clock,
	CheckCircle,
	AlertCircle,
	Calendar,
	ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
	const { isAuthenticated, user } = useAuth();
	// Gunakan nama state dan fungsi yang baru dari useRegistration
	const { registrations, fetchMyRegistrations, loading } = useRegistration();
	const router = useRouter();

	useEffect(() => {
		// Middleware sudah menangani redirect jika tidak authenticated
		// Jadi kita hanya perlu fetch data jika sudah pasti authenticated
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	if (loading || !registrations) {
		return (
			<div className="flex justify-center items-center h-full">
				<Loader2 className="h-8 w-8 animate-spin" />
			</div>
		);
	}

	// Jika user belum mendaftar kompetisi apapun, arahkan ke halaman pemilihan
	if (registrations.length === 0) {
		router.push("/competition/select");
		return null; // Tampilkan loading atau null selama redirect
	}

	// Untuk sementara kita tampilkan data dari registrasi pertama
	const currentRegistration = registrations[0];
	const team = currentRegistration?.team;
	const competition = currentRegistration?.competition;

	const competitionEndDate = new Date(
		competition?.endDate || "2025-07-30T23:59:59.000Z"
	);

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "APPROVED":
				return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
			case "PENDING":
				return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
			case "REJECTED":
				return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
			default:
				return <Badge variant="secondary">Unknown</Badge>;
		}
	};

	return (
		<div>
			<div className="space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Welcome back, {user?.username}!
					</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Here an overview of your competition status
					</p>
				</div>

				{/* Stats Cards */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<DashboardCard
						title="Registration Status"
						value={currentRegistration?.status || "Not Registered"}
						icon={
							currentRegistration?.status === "APPROVED"
								? CheckCircle
								: AlertCircle
						}
						className={
							currentRegistration?.status === "APPROVED"
								? "border-green-200"
								: "border-yellow-200"
						}
					/>
					<DashboardCard
						title="Competition"
						value={competition?.name || "N/A"}
						icon={Trophy}
					/>
					<DashboardCard
						title="Team Status"
						value={team ? team.name : "No Team"}
						icon={Users}
					/>
					<DashboardCard
						title="Time Remaining"
						value="See countdown"
						icon={Clock}
					/>
				</div>

				{/* Registration Status Card */}
				{currentRegistration && (
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Registration for {competition.name}</CardTitle>
									<CardDescription>
										Your current registration status and information
									</CardDescription>
								</div>
								{getStatusBadge(currentRegistration.status)}
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<p className="text-sm font-medium text-gray-500">
										Registration ID
									</p>
									<p className="text-lg font-semibold">
										#{currentRegistration.id}
									</p>
								</div>
								<div>
									<p className="text-sm font-medium text-gray-500">Team Name</p>
									<p className="text-lg font-semibold">{team?.name}</p>
								</div>
								<div>
									<p className="text-sm font-medium text-gray-500">Team ID</p>
									<p className="text-lg font-semibold">{team?.id}</p>
								</div>
							</div>

							<div className="flex space-x-2">
								<Button asChild variant="outline">
									<Link href="/dashboard/biodata">
										View Biodata
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
								<Button asChild variant="outline">
									<Link href="/dashboard/upload">
										Upload Documents
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Countdown */}
				<div className="grid gap-4 md:grid-cols-2">
					<CountdownCard
						targetDate={competitionEndDate}
						title="Competition Ends In"
					/>
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Calendar className="h-5 w-5" />
								<span>Quick Actions</span>
							</CardTitle>
							<CardDescription>Common tasks and shortcuts</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							<Button
								asChild
								variant="outline"
								className="w-full justify-start"
							>
								<Link href="/dashboard/biodata">
									<Users className="mr-2 h-4 w-4" />
									View My Biodata & Team
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								className="w-full justify-start"
							>
								<Link href="/dashboard/upload">
									<Trophy className="mr-2 h-4 w-4" />
									Upload Competition Files
								</Link>
							</Button>
							<Button
								asChild
								variant="outline"
								className="w-full justify-start"
							>
								<Link href="/dashboard/notifications">
									<Clock className="mr-2 h-4 w-4" />
									View Notifications
								</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
