// app/admin/dashboard/page.tsx

"use client";

import { useEffect, useState } from "react";
import { DashboardCard } from "@/components/features/dashboard/DashboardCard";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Users,
	Trophy,
	FileText,
	CheckCircle,
	Clock,
	Calendar,
} from "lucide-react";
import Link from "next/link";
import { getAllRegistrations } from "@/lib/registration";
import { getAllTeams } from "@/lib/team";
import { Registration } from "@/types/registration";
import { PageHeader } from "@/components/common/PageHeader";
import { PageLoader } from "@/components/common/PageLoader";

export default function AdminDashboardPage() {
	const [stats, setStats] = useState({
		totalRegistrations: 0,
		totalTeams: 0,
		pendingReviews: 0,
	});
	const [recentRegistrations, setRecentRegistrations] = useState<
		Registration[]
	>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				// PERBAIKAN: Menggunakan panggilan API yang lebih efisien
				// 1. Ambil total registrasi dan 5 data terbaru
				// 2. Ambil total tim
				// 3. Ambil total registrasi yang PENDING
				const [registrationsResponse, teamsData, pendingResponse] =
					await Promise.all([
						getAllRegistrations({ page: 1, limit: 5 }), // Cukup ambil 5 data terbaru
						getAllTeams(),
						getAllRegistrations({ status: "PENDING", limit: 1 }), // Cukup ambil 1 data untuk mendapatkan total pending
					]);

				setStats({
					totalRegistrations: registrationsResponse.total,
					totalTeams: teamsData.length,
					pendingReviews: pendingResponse.total,
				});

				setRecentRegistrations(registrationsResponse.data);
			} catch (error) {
				console.error("Failed to fetch admin dashboard data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	if (loading) {
		return <PageLoader />;
	}

	return (
		<div className="space-y-8">
			<PageHeader
				title="Admin Dashboard"
				description="Overview of competition management and statistics."
			/>

			{/* Stats Cards - Disesuaikan dengan data yang efisien untuk diambil */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<DashboardCard
					title="Total Registrations"
					value={stats.totalRegistrations}
					icon={FileText}
				/>
				<DashboardCard
					title="Total Teams"
					value={stats.totalTeams}
					icon={Users}
				/>
				<DashboardCard
					title="Pending Reviews"
					value={stats.pendingReviews}
					icon={Clock}
				/>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* Recent Activities */}
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Calendar className="h-5 w-5" />
							<span>Recent Registrations</span>
						</CardTitle>
						<CardDescription>
							A log of the latest teams that registered for competitions.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentRegistrations.length > 0 ? (
								recentRegistrations.map((reg) => (
									<div
										key={reg.userId + reg.competition.id}
										className="flex items-center space-x-3"
									>
										<div className="flex-shrink-0">
											<Users className="h-5 w-5 text-muted-foreground" />
										</div>
										<div className="flex-1">
											<p className="text-sm text-foreground">
												<span className="font-semibold">{reg.team.name}</span>{" "}
												registered for the{" "}
												<span className="font-semibold">
													{reg.competition.name}
												</span>
												.
											</p>
											<p className="text-xs text-muted-foreground mt-1">
												Status:{" "}
												<span className="font-medium">{reg.status}</span>
											</p>
										</div>
									</div>
								))
							) : (
								<p className="text-sm text-muted-foreground">
									No recent registrations found.
								</p>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Quick Actions */}
				<Card>
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
						<CardDescription>Navigate to management pages.</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						<Button asChild variant="outline" className="w-full justify-start">
							<Link href="/admin/registrations">
								<FileText className="mr-2 h-4 w-4" />
								Manage Registrations
							</Link>
						</Button>
						<Button asChild variant="outline" className="w-full justify-start">
							<Link href="/admin/teams">
								<Users className="mr-2 h-4 w-4" />
								Manage Teams
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
