// File: app/dashboard/page.tsx

"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DashboardCard } from "@/components/features/dashboard/DashboardCard";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration";
import {
	Trophy,
	Users,
	CheckCircle,
	AlertCircle,
	XCircle,
	Clock,
	FileText,
	Info,
} from "lucide-react";
import { PageLoader } from "@/components/common/PageLoader";
import { PageHeader } from "@/components/common/PageHeader";
import { REGISTRATION_STATUS } from "@/lib/constants";

// Komponen baru
import { WhatToDoCard } from "@/components/features/dashboard/WhatToDoCard";
import { CompetitionTimelineCard } from "@/components/features/dashboard/CompetitionTimelineCard";
import { ImportantLinksCard } from "@/components/features/dashboard/ImportantLinksCard";

export default function DashboardPage() {
	const { isAuthenticated, user } = useAuth();
	const { registrations, fetchMyRegistrations, loading } = useRegistration();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

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
					className: "border-green-300 dark:border-green-700",
				};
			case REGISTRATION_STATUS.PENDING:
				return {
					value: "Pending",
					icon: Clock,
					className: "border-yellow-300 dark:border-yellow-700",
				};
			case REGISTRATION_STATUS.REVIEW:
				return {
					value: "In Review",
					icon: Info,
					className: "border-blue-300 dark:border-blue-700",
				};
			case REGISTRATION_STATUS.REJECTED:
				return {
					value: "Rejected",
					icon: XCircle,
					className: "border-red-300 dark:border-red-700",
				};
			case REGISTRATION_STATUS.PRELIMINARY:
				return {
					value: "Preliminary",
					icon: FileText,
					className: "border-blue-300 dark:border-blue-700",
				};
			case REGISTRATION_STATUS.FINAL:
				return {
					value: "Final",
					icon: Trophy,
					className: "border-purple-300 dark:border-purple-700",
				};
			case REGISTRATION_STATUS.ELIMINATED:
				return {
					value: "Eliminated",
					icon: XCircle,
					className: "border-red-300 dark:border-red-700",
				};
			default:
				return {
					value: "Unknown",
					icon: AlertCircle,
					className: "border-gray-300 dark:border-gray-700",
				};
		}
	}, [currentRegistration]);

	if (loading || !registrations) {
		return <PageLoader />;
	}

	if (!currentRegistration) {
		if (typeof window !== "undefined") {
			router.push("/competition/select");
		}
		return <PageLoader />;
	}

	const { team, competition, status } = currentRegistration;

	return (
		<div className="space-y-4">
			<PageHeader
				title={`Welcome back, ${user?.username}!`}
				description="Here is an overview of your competition status."
			/>

			<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
				{/* <CountdownCard
					targetDate={competitionEndDate}
					title="Pendaftaran Berakhir Dalam"
				/> */}
			</section>

			<section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="space-y-4 lg:col-span-2">
					<WhatToDoCard status={status} competitionName={competition.name} />
					<ImportantLinksCard competition={competition} />
				</div>
				<div className="lg:col-span-1">
					<CompetitionTimelineCard competition={competition} />
				</div>
			</section>
		</div>
	);
}
