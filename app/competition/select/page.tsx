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

// URL Gambar Placeholder (ganti jika Anda punya gambar sendiri)
const ctfImageUrl = "https://storage.theaceundip.id/assets/ctf-bg-picture.webp";
const uiuxImageUrl =
	"https://storage.theaceundip.id/assets/uiux-bg-picture.webp";
const ftlImageUrl = "https://storage.theaceundip.id/assets/ftl-bg-picture.webp";

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
		<div className="flex h-screen w-screen flex-col md:flex-row overflow-hidden bg-black text-white">
			{competitionsLoading && <PageLoader />}
			{competitionsError && (
				<div className="absolute top-1/2 left-1/2 z-10 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4">
					<Alert variant="destructive">
						<AlertDescription>{competitionsError}</AlertDescription>
					</Alert>
				</div>
			)}

			{!competitionsLoading && !competitionsError && (
				<>
					{/* ================== Panel untuk CTF ================== */}
					{ctfCompetition && (
						<div
							className="group relative flex-1 overflow-hidden transition-all duration-700 ease-in-out hover:flex-[8]"
							onClick={() => handleSelectAndNavigate(ctfCompetition)}
						>
							<div
								className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
								style={{ backgroundImage: `url(${ctfImageUrl})` }}
							/>
							<div className="absolute inset-0 bg-secondary/40 transition-colors duration-500 group-hover:bg-secondary/50" />
							<div className="relative flex h-full w-full flex-col items-center justify-between p-6">
								<h2 className="absolute left-0 top-0 h-full w-16 flex items-center justify-center text-center text-2xl font-bold uppercase tracking-widest [writing-mode:vertical-rl] transition-colors duration-500 group-hover:text-primary">
									Capture The Flag
								</h2>
								<div className="flex h-full w-full flex-col items-center justify-end text-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
									<h1 className="text-4xl font-bold tracking-tighter md:text-6xl transition-colors duration-1000 group-hover:text-primary">
										Capture The Flag
									</h1>
									<p className="mt-4 max-w-sm text-lg text-white/80">
										Cyber Sentinel 2025: Break the Code, Secure the Future.
									</p>
									<Button
										onClick={(e) => {
											e.stopPropagation();
											handleSelectAndNavigate(ctfCompetition);
										}}
										variant="outline"
										className="mt-8 border-2 font-medium tracking-wide border-white/50 bg-transparent text-lg text-white transition-all hover:border-white hover:bg-white hover:text-secondary cursor-pointer"
										size="lg"
									>
										Select Competition
									</Button>
								</div>
							</div>
						</div>
					)}

					{/* ================== Panel untuk UI/UX ================== */}
					{uiuxCompetition && (
						<div
							className="group relative flex-1 overflow-hidden transition-all duration-700 ease-in-out hover:flex-[8]"
							onClick={() => handleSelectAndNavigate(uiuxCompetition)}
						>
							<div
								className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
								style={{ backgroundImage: `url(${uiuxImageUrl})` }}
							/>
							<div className="absolute inset-0 bg-secondary/40 transition-colors duration-500 group-hover:bg-secondary/50" />
							<div className="relative flex h-full w-full flex-col items-center justify-between p-6">
								<h2 className="absolute left-0 top-0 h-full w-16 flex items-center justify-center text-center text-2xl font-bold uppercase tracking-widest [writing-mode:vertical-rl] transition-colors duration-500 group-hover:text-primary">
									UI/UX Design
								</h2>
								<div className="flex h-full w-full flex-col items-center justify-end text-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
									<h1 className="text-4xl font-bold tracking-tighter md:text-6xl transition-colors duration-1000 group-hover:text-primary">
										UI/UX Design
									</h1>
									<p className="mt-4 max-w-sm text-lg text-white/80">
										Impactful Digital Innovation: Designing Valuable and
										Sustainable Solutions.
									</p>
									<Button
										onClick={(e) => {
											e.stopPropagation();
											handleSelectAndNavigate(uiuxCompetition);
										}}
										variant="outline"
										className="mt-8 border-2 font-medium tracking-wide border-white/50 bg-transparent text-lg text-white transition-all hover:border-white hover:bg-white hover:text-secondary cursor-pointer"
										size="lg"
									>
										Select Competition
									</Button>
								</div>
							</div>
						</div>
					)}

					{/* ================== Panel untuk FTL ================== */}
					{ftlCompetition && (
						<div
							className="group relative flex-1 overflow-hidden transition-all duration-700 ease-in-out hover:flex-[8]"
							onClick={() => handleSelectAndNavigate(ftlCompetition)}
						>
							<div
								className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
								style={{ backgroundImage: `url(${ftlImageUrl})` }}
							/>
							<div className="absolute inset-0 bg-secondary/40 transition-colors duration-500 group-hover:bg-secondary/50" />
							<div className="relative flex h-full w-full flex-col items-center justify-between p-6">
								<h2 className="absolute left-0 top-0 h-full w-16 flex items-center justify-center text-center text-2xl font-bold uppercase tracking-widest [writing-mode:vertical-rl] transition-colors duration-500 group-hover:text-primary">
									Follow The Line
								</h2>
								<div className="flex h-full w-full flex-col items-center justify-end text-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
									<h1 className="text-4xl font-bold tracking-tighter md:text-6xl transition-colors duration-1000 group-hover:text-primary">
										Follow The Line
									</h1>
									<p className="mt-4 max-w-sm text-lg text-white/80">
										Algorithmic Edge: Precision in Motion, Unrivaled Victory.
									</p>
									<Button
										onClick={(e) => {
											e.stopPropagation();
											handleSelectAndNavigate(ftlCompetition);
										}}
										variant="outline"
										className="mt-8 border-2 font-medium tracking-wide border-white/50 bg-transparent text-lg text-white transition-all hover:border-white hover:bg-white hover:text-secondary cursor-pointer"
										size="lg"
									>
										Select Competition
									</Button>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
