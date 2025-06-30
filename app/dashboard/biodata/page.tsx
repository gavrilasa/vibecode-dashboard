// app/dashboard/biodata/page.tsx

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration";
import { Edit, Info } from "lucide-react";
import { PageLoader } from "@/components/common/PageLoader";
import { PageHeader } from "@/components/common/PageHeader";
import { TeamInfoCard } from "@/components/features/biodata/TeamInfoCard";
import { MemberList } from "@/components/features/biodata/MemberList";
import { DocumentList } from "@/components/features/biodata/DocumentList";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";
import { APP_ROUTES, COMPETITION_KEYS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { canEditRegistration } from "@/lib/permissions";

export default function BiodataPage() {
	const { isAuthenticated } = useAuth();
	const { registrations, loading, fetchMyRegistrations } = useRegistration();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	if (loading || !registrations) {
		return <PageLoader message="Loading your registration data..." />;
	}

	if (registrations.length === 0) {
		return (
			<div className="space-y-8">
				<PageHeader title="No Registration Found" />
				<Card>
					<CardContent className="pt-6">
						<EmptyState
							title="You Are Not Registered"
							description="You have not registered for any competition yet."
						/>
						<div className="mt-4 text-center">
							<Button asChild>
								<Link href={APP_ROUTES.SELECT_COMPETITION}>
									Select a Competition
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	const currentRegistration = registrations[0];
	const { team, competition, details, documents, status } = currentRegistration;

	const isLocked = !canEditRegistration(currentRegistration);

	const competitionDisplayName = competition.name
		.toLowerCase()
		.includes(COMPETITION_KEYS.FTL)
		? "Line Follower"
		: competition.name;

	const updatedCompetition = { ...competition, name: competitionDisplayName };

	return (
		<div className="space-y-6">
			<PageHeader
				title="Team & Biodata"
				description="View your team information, member details, and documents."
			>
				<Button
					asChild
					className={cn("text-white", {
						"bg-gray-400 hover:bg-gray-500 cursor-not-allowed": isLocked,
					})}
					disabled={isLocked}
					aria-disabled={isLocked}
				>
					<Link
						href={isLocked ? "#" : APP_ROUTES.BIODATA_EDIT}
						onClick={(e) => {
							if (isLocked) e.preventDefault();
						}}
					>
						<Edit className="w-4 h-4 mr-2" />
						Edit Biodata
					</Link>
				</Button>
			</PageHeader>

			<div className="space-y-4">
				{isLocked && (
					<Alert className="border-secondary text-secondary">
						<Info className="h-4 w-4 !text-secondary" />
						<AlertDescription>
							Pendaftaran Anda sedang dalam tahap peninjauan atau sudah selesai.
							Perubahan pada biodata dan dokumen tidak dapat dilakukan.
						</AlertDescription>
					</Alert>
				)}
				<TeamInfoCard
					team={team}
					competition={updatedCompetition}
					details={details}
				/>
				<MemberList members={details.members} teamName={team.name} />
				<DocumentList
					documents={documents}
					registrationId={currentRegistration.id}
				/>
			</div>
		</div>
	);
}
