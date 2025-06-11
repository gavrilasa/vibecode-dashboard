// app/dashboard/page.tsx

"use client";

import { useEffect, useMemo } from "react";
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
	XCircle,
} from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PageLoader } from "@/components/common/PageLoader";
import { REGISTRATION_STATUS } from "@/lib/constants";

export default function DashboardPage() {
	const { isAuthenticated, user } = useAuth();
	const { registrations, fetchMyRegistrations, loading } = useRegistration();
	const router = useRouter();

	const currentRegistration =
		registrations && registrations.length > 0 ? registrations[0] : null;

	const statusCardProps = useMemo(() => {
		if (!currentRegistration) {
			return {
				value: "Not Registered",
				icon: AlertCircle,
				className: "border-gray-300 dark:border-gray-700",
			};
		}
		switch (currentRegistration.status) {
			case REGISTRATION_STATUS.APPROVED:
				return {
					value: "Approved",
					icon: CheckCircle,
					className: "border-2 border-green-300 dark:border-green-700",
				};
			case REGISTRATION_STATUS.PENDING:
				return {
					value: "Pending",
					icon: Clock,
					className: "border-2 border-yellow-300 dark:border-yellow-700",
				};
			case REGISTRATION_STATUS.REVIEW:
				return {
					value: "In Review",
					icon: CheckCircle,
					className: "border-2 border-blue-300 dark:border-blue-700",
				};
			case REGISTRATION_STATUS.REJECTED:
				return {
					value: "Rejected",
					icon: XCircle,
					className: "border-2 border-red-300 dark:border-red-700",
				};
			case REGISTRATION_STATUS.PRELIMINARY:
				return {
					value: "Preliminary Stage",
					icon: FileText,
					className: "border-2 border-blue-300 dark:border-blue-700",
				};
			case REGISTRATION_STATUS.FINAL:
				return {
					value: "Final Stage",
					icon: Trophy,
					className: "border-2 border-purple-300 dark:border-purple-700",
				};
			default:
				return {
					value: "Unknown",
					icon: AlertCircle,
					className: "border-2 border-gray-300 dark:border-gray-700",
				};
		}
	}, [currentRegistration]);

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

	if (!currentRegistration) {
		if (typeof window !== "undefined") {
			router.push("/competition/select");
		}
		return <PageLoader />;
	}

	const { team, competition } = currentRegistration;
	const competitionEndDate = new Date(competition?.endDate);

	return (
		<div>
			<div className="space-y-8">
				{/* Header dengan judul berwarna primer */}
				<div>
					<h1 className="text-3xl font-bold text-primary">
						{`Welcome back, ${user?.username}!`}
					</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Here is an overview of your competition status.
					</p>
				</div>

				<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<DashboardCard
						title="Registration Status"
						value={statusCardProps.value}
						icon={statusCardProps.icon}
						className={statusCardProps.className}
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
				<section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{/* Kartu utama dengan background dan judul berwarna primer */}
					<Card className="lg:col-span-2 bg-primary/5">
						<CardHeader>
							<div className="flex flex-wrap items-start justify-between gap-2">
								<div>
									<CardTitle className="text-xl text-primary">
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
							{/* Tombol utama menggunakan varian default (warna primer) */}
							<div className="flex flex-wrap gap-2"></div>
						</CardContent>
					</Card>

					{/* Kartu tindakan cepat dengan ikon berwarna primer */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2 text-xl">
								<Calendar className="h-5 w-5 text-primary" />
								<span>Quick Actions</span>
							</CardTitle>
							<CardDescription>Common tasks and shortcuts</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col space-y-3">
							<Button asChild variant="ghost" className="w-full justify-start">
								<Link href="/dashboard/biodata">
									<Users className="mr-3 h-4 w-4 text-primary" />
									View My Biodata & Team
								</Link>
							</Button>
							<Button asChild variant="ghost" className="w-full justify-start">
								<Link href="/dashboard/upload">
									<Trophy className="mr-3 h-4 w-4 text-primary" />
									Upload Competition Files
								</Link>
							</Button>
							<Button asChild variant="ghost" className="w-full justify-start">
								<Link href="/dashboard/notifications">
									<Clock className="mr-3 h-4 w-4 text-primary" />
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
