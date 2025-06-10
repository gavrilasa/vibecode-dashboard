// app/competition/select/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { useCompetition } from "@/hooks/useCompetition";
import { useRegistration } from "@/hooks/useRegistration";
import { useRegistrationFlowStore } from "@/store/registration-flow-store";
import { Competition } from "@/types/competition";
import { PageLoader } from "@/components/common/PageLoader";
import { COMPETITION_KEYS } from "@/lib/constants";

export default function CompetitionSelectPage() {
	const { isAuthenticated } = useAuth();
	const {
		competitions,
		loading: competitionsLoading,
		error: competitionsError,
		fetchCompetitions,
	} = useCompetition();

	const {
		registrations,
		loading: registrationLoading,
		fetchMyRegistrations,
	} = useRegistration();

	const { setSelectedCompetition } = useRegistrationFlowStore();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
			fetchCompetitions();
		}
	}, [isAuthenticated, fetchMyRegistrations, fetchCompetitions]);

	const handleSelectAndNavigate = (competition: Competition) => {
		if (competition) {
			setSelectedCompetition(competition);
			router.push("/registration/form");
		}
	};

	if (registrationLoading || (registrations && registrations.length > 0)) {
		return <PageLoader />;
	}

	const ctfCompetition = competitions.find((c) =>
		c.name.toLowerCase().includes(COMPETITION_KEYS.CTF)
	);
	const uiuxCompetition = competitions.find((c) =>
		c.name.toLowerCase().includes(COMPETITION_KEYS.UI_UX)
	);
	const ftlCompetition = competitions.find((c) =>
		c.name.toLowerCase().includes(COMPETITION_KEYS.FTL)
	);

	return (
		<div className="flex flex-col md:flex-row h-screen w-screen text-white">
			{competitionsLoading && <PageLoader />}
			{competitionsError && (
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4">
					<Alert variant="destructive">
						<AlertDescription>{competitionsError}</AlertDescription>
					</Alert>
				</div>
			)}

			{!competitionsLoading && !competitionsError && (
				<>
					{/* CTF Section */}
					{ctfCompetition && (
						<div
							className="flex-1 flex flex-col justify-center items-center p-8 text-center transition-all duration-300 ease-in-out hover:flex-[1.1]"
							style={{ backgroundColor: "#E58A2E" }}
						>
							<h1 className="text-4xl md:text-6xl font-bold">
								Capture The Flag
							</h1>
							<p className="mt-4 text-lg max-w-sm">
								Dive into a world of digital puzzles and cybersecurity
								challenges.
							</p>
							<Button
								onClick={() => handleSelectAndNavigate(ctfCompetition)}
								className="mt-8 bg-white/20 hover:bg-white/30 text-white border-white border"
								size="lg"
							>
								Select Competition
							</Button>
						</div>
					)}

					{/* UI/UX Section */}
					{uiuxCompetition && (
						<div
							className="flex-1 flex flex-col justify-center items-center p-8 text-center transition-all duration-300 ease-in-out hover:flex-[1.1]"
							style={{ backgroundColor: "#377A80" }}
						>
							<h1 className="text-4xl md:text-6xl font-bold">UI/UX Design</h1>
							<p className="mt-4 text-lg max-w-sm">
								Shape the future by designing intuitive and beautiful user
								experiences.
							</p>
							<Button
								onClick={() => handleSelectAndNavigate(uiuxCompetition)}
								className="mt-8 bg-white/20 hover:bg-white/30 text-white border-white border"
								size="lg"
							>
								Select Competition
							</Button>
						</div>
					)}

					{/* FTL Section */}
					{ftlCompetition && (
						<div
							className="flex-1 flex flex-col justify-center items-center p-8 text-center transition-all duration-300 ease-in-out hover:flex-[1.1]"
							style={{ backgroundColor: "#204E60" }}
						>
							<h1 className="text-4xl md:text-6xl font-bold">
								Follow The Light
							</h1>
							<p className="mt-4 text-lg max-w-sm">
								Navigate complex algorithms in this fast-paced competitive
								programming challenge.
							</p>
							<Button
								onClick={() => handleSelectAndNavigate(ftlCompetition)}
								className="mt-8 bg-white/20 hover:bg-white/30 text-white border-white border"
								size="lg"
							>
								Select Competition
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
