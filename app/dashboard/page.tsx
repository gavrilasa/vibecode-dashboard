"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
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
import { useTeam } from "@/hooks/useTeam";
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

export default function DashboardPage() {
	const { isAuthenticated, user } = useAuth();
	const { registration, fetchRegistration } = useRegistration();
	const { team, fetchMyTeam } = useTeam();
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/auth/login");
			return;
		}
		fetchRegistration();
		fetchMyTeam();
	}, [isAuthenticated, fetchRegistration, fetchMyTeam, router]);

	if (!isAuthenticated) {
		return null;
	}

	// Mock competition end date (replace with actual data)
	const competitionEndDate = new Date("2025-07-30T23:59:59.000Z");

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
		<AppLayout>
			<div className="space-y-6">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Welcome back, {user?.name}!
					</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Here an overview of your competition status
					</p>
				</div>

				{/* Stats Cards */}
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<DashboardCard
						title="Registration Status"
						value={registration?.status || "Not Registered"}
						icon={
							registration?.status === "APPROVED" ? CheckCircle : AlertCircle
						}
						className={
							registration?.status === "APPROVED"
								? "border-green-200"
								: "border-yellow-200"
						}
					/>
					<DashboardCard
						title="Competition ID"
						value={registration?.competitionId || "N/A"}
						icon={Trophy}
					/>
					<DashboardCard
						title="Team Status"
						value={team ? "In Team" : "No Team"}
						icon={Users}
					/>
					<DashboardCard
						title="Time Remaining"
						value="See countdown"
						icon={Clock}
					/>
				</div>

				{/* Registration Status Card */}
				{registration && (
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Registration Details</CardTitle>
									<CardDescription>
										Your current registration status and information
									</CardDescription>
								</div>
								{getStatusBadge(registration.status)}
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<p className="text-sm font-medium text-gray-500">
										Registration ID
									</p>
									<p className="text-lg font-semibold">#{registration.id}</p>
								</div>
								<div>
									<p className="text-sm font-medium text-gray-500">
										Competition ID
									</p>
									<p className="text-lg font-semibold">
										{registration.competitionId}
									</p>
								</div>
								<div>
									<p className="text-sm font-medium text-gray-500">User ID</p>
									<p className="text-lg font-semibold">{registration.userId}</p>
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

				{/* Team Information */}
				{team && (
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Users className="h-5 w-5" />
								<span>Team Information</span>
							</CardTitle>
							<CardDescription>Your current team details</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<p className="text-sm font-medium text-gray-500">Team Name</p>
									<p className="text-lg font-semibold">{team.name}</p>
								</div>
								<div>
									<p className="text-sm font-medium text-gray-500">
										Competition
									</p>
									<p className="text-lg font-semibold">
										{team.competition.name}
									</p>
								</div>
								<div>
									<p className="text-sm font-medium text-gray-500">
										Max Members
									</p>
									<p className="text-lg font-semibold">
										{team.competition.maxMembers}
									</p>
								</div>
								<div>
									<p className="text-sm font-medium text-gray-500">Team ID</p>
									<p className="text-lg font-semibold">{team.id}</p>
								</div>
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
									View My Biodata
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
		</AppLayout>
	);
}
