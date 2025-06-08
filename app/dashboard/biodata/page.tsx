"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration";
import { Edit } from "lucide-react";
import { PageLoader } from "@/components/common/PageLoader";
import { PageHeader } from "@/components/common/PageHeader";
import { TeamInfoCard } from "@/components/features/biodata/TeamInfoCard";
import { MemberList } from "@/components/features/biodata/MemberList";
import { DocumentList } from "@/components/features/biodata/DocumentList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";

export default function BiodataPage() {
	const { isAuthenticated } = useAuth();
	const { registrations, loading, fetchMyRegistrations } = useRegistration();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	if (loading || !registrations) {
		return <PageLoader message="Loading your data..." />;
	}

	if (registrations.length === 0) {
		return (
			<div className="space-y-8">
				<PageHeader title="No Registration Found" />
				<Card>
					<CardContent className="pt-6">
						<EmptyState
							title="You are not registered"
							description="You have not registered for any competition yet."
						/>
						<div className="text-center mt-4">
							<Button asChild>
								<Link href="/competition/select">Select a Competition</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	const currentRegistration = registrations[0];
	const { team, competition, details, documents } = currentRegistration;

	return (
		<div className="space-y-8">
			<PageHeader
				title="Team & Biodata"
				description="View your team information, member details, and documents."
			>
				<Button disabled>
					<Edit className="mr-2 h-4 w-4" />
					Edit Biodata (Coming Soon)
				</Button>
			</PageHeader>

			<TeamInfoCard team={team} competition={competition} details={details} />
			<MemberList members={details.members} teamName={team.name} />
			<DocumentList
				documents={documents}
				registrationId={currentRegistration.id}
			/>
		</div>
	);
}
