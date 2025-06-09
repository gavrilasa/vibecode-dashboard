// app/dashboard/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardCard } from "@/components/features/dashboard/DashboardCard";
import { CountdownCard } from "@/components/features/dashboard/CountdownCard";
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
import {
	Trophy,
	Users,
	Clock,
	CheckCircle,
	AlertCircle,
	Calendar,
	ArrowRight,
	FileText,
} from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PageHeader } from "@/components/common/PageHeader";
import { PageLoader } from "@/components/common/PageLoader";

export default function DashboardPage() {
	const { isAuthenticated, user } = useAuth();
	const { registrations, fetchMyRegistrations, loading } = useRegistration();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	if (loading || !registrations) {
		return (
			<div>
				<PageLoader />
			</div>
		);
	}

	if (registrations.length === 0) {
		// Redirect akan ditangani oleh layout atau hook, tapi sebagai fallback:
		if (typeof window !== "undefined") {
			router.push("/competition/select");
		}
		return null;
	}

	const currentRegistration = registrations[0];
	const team = currentRegistration?.team;
	const competition = currentRegistration?.competition;

	const competitionEndDate = new Date(
		competition?.endDate || "2025-07-30T23:59:59.000Z"
	);

	return (
		<div>
			<div className="space-y-8">
				{" "}
				{/* Header */}
				<PageHeader
					title={`Welcome back, ${user?.username}!`}
					description="Here is an overview of your competition status."
				/>
				{/* Stats Cards */}
				<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
								? "border-green-300 dark:border-green-700"
								: "border-yellow-300 dark:border-yellow-700"
						}
					/>
					<DashboardCard
						title="Competition"
						value={competition?.name || "N/A"}
						icon={Trophy}
					/>
					<DashboardCard
						title="Team Name"
						value={team ? team.name : "No Team"}
						icon={Users}
					/>
					<CountdownCard
						targetDate={competitionEndDate}
						title="Time Until Registration Ends"
					/>
				</section>
				{/* Main Info Section */}
				<section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{/* Registration Status Card */}
					{currentRegistration && (
						<Card className="lg:col-span-2">
							<CardHeader>
								<div className="flex flex-wrap items-start justify-between gap-2">
									<div>
										<CardTitle className="text-xl">
											Registration for {competition.name}
										</CardTitle>
										<CardDescription>
											Your current registration status and information.
										</CardDescription>
									</div>
									<StatusBadge status={currentRegistration.status} />
								</div>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm"></div>

								<div className="flex flex-wrap gap-2">
									<Button asChild variant="outline">
										<Link href="/dashboard/biodata">
											<FileText className="mr-2 h-4 w-4" />
											View Biodata
										</Link>
									</Button>
									<Button asChild variant="outline">
										<Link href="/dashboard/upload">
											<Users className="mr-2 h-4 w-4" />
											Manage Team & Documents
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Quick Actions Card */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2 text-xl">
								<Calendar className="h-5 w-5" />
								<span>Quick Actions</span>
							</CardTitle>
							<CardDescription>Common tasks and shortcuts</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col space-y-3">
							<Button asChild variant="ghost" className="w-full justify-start">
								<Link href="/dashboard/biodata">
									<Users className="mr-3 h-4 w-4" />
									View My Biodata & Team
								</Link>
							</Button>
							<Button asChild variant="ghost" className="w-full justify-start">
								<Link href="/dashboard/upload">
									<Trophy className="mr-3 h-4 w-4" />
									Upload Competition Files
								</Link>
							</Button>
							<Button asChild variant="ghost" className="w-full justify-start">
								<Link href="/dashboard/notifications">
									<Clock className="mr-3 h-4 w-4" />
									View Notifications
								</Link>
							</Button>
						</CardContent>
					</Card>
				</section>
			</div>
		</div>
	);
}
