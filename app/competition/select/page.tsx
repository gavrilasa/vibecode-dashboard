"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { CompetitionCard } from "@/components/competition/CompetitionCard";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { useCompetition } from "@/hooks/useCompetition";
import { useRegistration } from "@/hooks/useRegistration";
import { Competition } from "@/types/competition";
import { Loader2 } from "lucide-react";

export default function CompetitionSelectPage() {
	const { isAuthenticated } = useAuth();
	const {
		competitions,
		loading: competitionsLoading,
		error: competitionsError,
		fetchCompetitions,
	} = useCompetition();
	const {
		register,
		loading: registrationLoading,
		error: registrationError,
	} = useRegistration();
	const [selectedCompetition, setSelectedCompetition] =
		useState<Competition | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/auth/login");
			return;
		}
		fetchCompetitions();
	}, [isAuthenticated, fetchCompetitions, router]);

	const handleSelectCompetition = (competition: Competition) => {
		setSelectedCompetition(competition);
	};

	const handleRegister = async () => {
		if (!selectedCompetition) return;

		const registration = await register({
			competitionId: selectedCompetition.id,
		});
		if (registration) {
			router.push("/registration/form");
		}
	};

	if (!isAuthenticated) {
		return null;
	}

	return (
		<AppLayout>
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Select Competition
					</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Choose a competition to participate in
					</p>
				</div>

				{competitionsError && (
					<Alert variant="destructive">
						<AlertDescription>{competitionsError}</AlertDescription>
					</Alert>
				)}

				{registrationError && (
					<Alert variant="destructive">
						<AlertDescription>{registrationError}</AlertDescription>
					</Alert>
				)}

				{competitionsLoading ? (
					<div className="flex justify-center py-12">
						<Loader2 className="h-8 w-8 animate-spin" />
					</div>
				) : (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{competitions.map((competition) => (
							<CompetitionCard
								key={competition.id}
								competition={competition}
								onSelect={handleSelectCompetition}
								selected={selectedCompetition?.id === competition.id}
							/>
						))}
					</div>
				)}

				{selectedCompetition && (
					<div className="flex justify-center">
						<Button
							onClick={handleRegister}
							disabled={registrationLoading}
							size="lg"
						>
							{registrationLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Registering...
								</>
							) : (
								"Continue to Registration"
							)}
						</Button>
					</div>
				)}
			</div>
		</AppLayout>
	);
}
