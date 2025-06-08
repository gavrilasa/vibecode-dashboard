// app/competition/select/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { CompetitionCard } from "@/components/competition/CompetitionCard";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { useCompetition } from "@/hooks/useCompetition";
import { useRegistration } from "@/hooks/useRegistration"; // Impor hook registrasi
import { useRegistrationFlowStore } from "@/store/registration-flow-store";
import { Competition } from "@/types/competition";
import { Loader2, ArrowRight } from "lucide-react";

export default function CompetitionSelectPage() {
	const { isAuthenticated } = useAuth();
	const {
		competitions,
		loading: competitionsLoading,
		error: competitionsError,
		fetchCompetitions,
	} = useCompetition();

	// PERBAIKAN: Tambahkan hook registrasi untuk memeriksa status
	const {
		registrations,
		loading: registrationLoading,
		fetchMyRegistrations,
	} = useRegistration();

	const { selectedCompetition, setSelectedCompetition } =
		useRegistrationFlowStore();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			// Pertama, cek status registrasi user
			fetchMyRegistrations();
			// Kemudian, fetch data kompetisi
			fetchCompetitions();
		}
	}, [isAuthenticated, fetchMyRegistrations, fetchCompetitions]);

	// PERBAIKAN: Tambahkan useEffect untuk redirect jika sudah terdaftar
	useEffect(() => {
		if (registrations && registrations.length > 0) {
			// Jika user sudah punya data registrasi, langsung arahkan ke dashboard
			router.push("/dashboard");
		}
	}, [registrations, router]);

	const handleSelectCompetition = (competition: Competition) => {
		setSelectedCompetition(competition);
	};

	const handleContinue = () => {
		if (selectedCompetition) {
			router.push("/registration/form");
		}
	};

	// Tampilkan loading jika sedang memeriksa status registrasi
	if (registrationLoading || (registrations && registrations.length > 0)) {
		return (
			<div className="flex h-screen w-full items-center justify-center bg-background">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	return (
		<AppLayout>
			<div className="space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Select Competition
					</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Choose a competition to participate in (Step 1 of 2)
					</p>
				</div>

				{competitionsError && (
					<Alert variant="destructive">
						<AlertDescription>{competitionsError}</AlertDescription>
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
					<div className="flex justify-center pt-4">
						<Button onClick={handleContinue} size="lg">
							Continue to Biodata Form
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</div>
				)}
			</div>
		</AppLayout>
	);
}
