// components/layout/CompetitionPageLayout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion";
import { CountdownCard } from "../features/dashboard/CountdownCard";
import { useRegistrationFlowStore } from "../../store/registration-flow-store";
import { useCompetition } from "../../hooks/useCompetition";
import { Competition } from "../../types/competition";
import { APP_ROUTES } from "../../lib/constants";
import {
	PenTool,
	Trophy,
	ArrowRight,
	Download,
	FlagIcon,
	Bot,
	FileText,
} from "lucide-react";
import { PageLoader } from "../common/PageLoader";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

export interface CompetitionPageData {
	id: number;
	key: "UI_UX" | "CTF" | "FTL";
	title: string;
	theme: string;
	cardImage: string;
	guidebookLink: string;
	countdownTarget: Date;
	terms: string[];
	prizes: string[];
	timeline: { name: string; date: string }[];
	faqs: { question: string; answer: string }[];
}

interface CompetitionPageLayoutProps {
	data: CompetitionPageData;
}

const competitionIcons = {
	UI_UX: PenTool,
	CTF: FlagIcon,
	FTL: Bot,
};

const prizeColors = {
	gold: "text-yellow-500",
	silver: "text-gray-400",
	bronze: "text-amber-700",
	default: "text-primary",
};

const prizeBgColors = {
	gold: "bg-yellow-500/20",
	silver: "bg-gray-400/20",
	bronze: "bg-amber-700/20",
	default: "bg-primary/20",
};

const getTrophyColor = (index: number) => {
	if (index === 0) return prizeColors.gold;
	if (index === 1) return prizeColors.silver;
	if (index === 2) return prizeColors.bronze;
	return prizeColors.default;
};

const getBackgroundColor = (index: number) => {
	if (index === 0) return prizeBgColors.gold;
	if (index === 1) return prizeBgColors.silver;
	if (index === 2) return prizeBgColors.bronze;
	return prizeBgColors.default;
};

const CompetitionTimeline = ({
	timeline,
}: {
	timeline: { name: string; date: string }[];
}) => (
	<Card className="text-white bg-white/5 border-white/20">
		<CardHeader>
			<CardTitle className="text-3xl font-lora">Competition Timeline</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="relative pl-4">
				<div className="absolute top-1 left-[1.35rem] h-full w-1 bg-white z-0" />
				<ul className="space-y-6">
					{timeline.map((item, index) => (
						<li key={index} className="flex items-start space-x-4">
							<div className="flex-shrink-0 mt-1">
								<div className="relative z-10 w-4 h-4 border-2 rounded-full bg-primary border-background ring-2 ring-white" />
							</div>
							<div>
								<p className="font-semibold">{item.name}</p>
								<p className="text-sm text-gray-400">{item.date}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</CardContent>
	</Card>
);

export function CompetitionPageLayout({ data }: CompetitionPageLayoutProps) {
	const router = useRouter();
	const { setSelectedCompetition } = useRegistrationFlowStore();
	const {
		competitions,
		loading: competitionsLoading,
		fetchCompetitions,
	} = useCompetition();
	const [competition, setCompetition] = useState<Competition | null>(null);
	const [isClient, setIsClient] = useState(false);

	const TermIcon = competitionIcons[data.key] || PenTool;

	useEffect(() => {
		setIsClient(true);
		fetchCompetitions();
	}, [fetchCompetitions]);

	useEffect(() => {
		const fetchAndSetCompetition = async () => {
			if (!competitionsLoading && competitions.length > 0) {
				const found = competitions.find((c) => c.id === data.id);
				if (found) {
					setCompetition(found);
				}
			}
		};
		fetchAndSetCompetition();
	}, [competitions, competitionsLoading, data.id]);

	// const handleRegister = () => {
	// 	if (competition) {
	// 		setSelectedCompetition(competition);
	// 		router.push(APP_ROUTES.REGISTRATION_FORM);
	// 	} else {
	// 		alert(
	// 			"Competition data is still loading. Please wait a moment and try again."
	// 		);
	// 	}
	// };

	if (competitionsLoading && !competition) {
		return <PageLoader />;
	}

	return (
		<div className="bg-[#012A43]">
			<Navbar />
			<main className="text-white">
				<section className="relative w-full min-h-screen pt-24 md:pt-32 overflow-hidden bg-[#012A43]">
					<div
						className="absolute top-[-50%] left-0 w-full h-[140%] bg-no-repeat bg-cover z-0"
						style={{
							backgroundImage:
								"url('https://storage.theaceundip.id/assets/compressed-bg-theace.webp')",
							backgroundPosition: "center top",
						}}
					></div>

					<div className="absolute bottom-[10%] left-0 w-full h-24 z-10 bg-gradient-to-b from-transparent to-[#012A43]" />

					<div className="container relative z-30 flex flex-col-reverse max-w-screen-xl gap-12 px-6 mx-auto mt-12 md:pl-4 md:mt-24 lg:flex-row lg:items-center">
						<div className="flex-1 space-y-6 text-center lg:text-left">
							<h1 className="text-5xl font-bold md:text-7xl font-lora">
								{data.title}
							</h1>
							<p className="font-sans text-base text-justify md:text-lg">
								{data.theme}
							</p>
							<div className="flex justify-center gap-4 pt-4 text-base lg:justify-start">
								<Button
									variant="ghost"
									className="relative w-full overflow-hidden text-base rounded-lg group md:w-1/2"
									size="lg"
								>
									<a
										href={data.guidebookLink}
										target="_blank"
										rel="noopener noreferrer"
									>
										<span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out bg-orange-100 text-primary group-hover:translate-x-full">
											<Download className="w-5 h-5 mr-2" /> Guidebook
										</span>
										<span
											className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out -translate-x-full bg-orange-100 text-primary group-hover:translate-x-0"
											aria-hidden="true"
										>
											<Download className="w-5 h-5 mr-2" /> Guidebook
										</span>
										<span className="invisible px-4">
											<Download className="w-5 h-5 mr-2" /> Guidebook
										</span>
									</a>
								</Button>
								<Link href="/auth/register" className="w-full">
									<Button
										size="lg"
										className="relative w-full p-1 overflow-hidden transition-colors duration-300 rounded-lg md:w-max bg-primary hover:bg-orange-400 group"
									>
										<div className="flex items-center w-full h-full mr-4 transition-transform duration-300 ease-out group-hover:translate-x-[5.15rem]">
											<div className="flex items-center justify-center p-2 bg-white rounded-md">
												<ArrowRight className="text-primary" size={16} />
											</div>
											<div className="flex items-center justify-center flex-1 h-full pl-2 text-base text-white">
												Register
											</div>
										</div>
										<div className="absolute top-0 left-0 flex items-center w-full h-full transition-transform duration-300 ease-out -translate-x-full group-hover:-translate-x-3">
											<div className="flex items-center justify-center flex-1 h-full text-base text-white">
												Register
											</div>
										</div>
									</Button>
								</Link>
							</div>
						</div>

						<div className="relative flex-1 aspect-[4/3] w-full max-w-lg mx-auto">
							<Image
								src={data.cardImage}
								alt={`${data.title} Competition Card`}
								fill
								className="object-contain"
								sizes="(max-width: 1024px) 100vw, 50vw"
								priority
							/>
						</div>
					</div>
				</section>

				{/* Main Content Section */}
				<section className="w-full">
					<div className="container grid max-w-screen-xl grid-cols-1 gap-6 px-4 mx-auto lg:grid-cols-3">
						<div className="space-y-6 lg:col-span-2">
							<Card className="text-white bg-white/5 border-white/20">
								<CardHeader>
									<CardTitle className="text-3xl font-lora">
										Terms and Conditions
									</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-4 text-white/90">
										{data.terms.map((term, index) => (
											<li key={index} className="flex items-start gap-3">
												<TermIcon className="flex-shrink-0 w-5 h-5 mt-0.5 text-primary" />
												<span>{term}</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>

							<Card className="text-white bg-white/5 border-white/20">
								<CardHeader>
									<CardTitle className="text-3xl font-lora">Prizes</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									{data.prizes.map((prize, index) => {
										const isTopPrize = index < 3;
										const Icon = isTopPrize ? Trophy : FileText;
										const iconColor = isTopPrize
											? getTrophyColor(index)
											: prizeColors.default;
										const bgColor = isTopPrize
											? getBackgroundColor(index)
											: "bg-primary/20";

										return (
											<div
												key={index}
												className="flex items-center gap-4 p-4 rounded-lg bg-[#F3F4F6]"
											>
												<div className={`p-2 rounded-full ${bgColor}`}>
													<Icon className={`w-6 h-6 ${iconColor}`} />
												</div>
												<p className="text-lg font-medium text-secondary">
													{prize}
												</p>
											</div>
										);
									})}
								</CardContent>
							</Card>

							<CompetitionTimeline timeline={data.timeline} />
						</div>

						<div className="relative lg:col-span-1">
							<div className="sticky top-24">
								{isClient && (
									<CountdownCard
										targetDate={data.countdownTarget}
										title="closed in"
									/>
								)}
							</div>
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="w-full py-8">
					<div className="container max-w-4xl px-4 py-12 mx-auto">
						<h2 className="mb-8 text-4xl font-bold text-center font-lora">
							Frequently Asked Questions
						</h2>
						<Accordion type="single" collapsible className="w-full">
							{data.faqs.map((faq, index) => (
								<AccordionItem
									key={index}
									value={`item-${index}`}
									className="px-4 mb-2 bg-white rounded-lg"
								>
									<AccordionTrigger className="text-left text-secondary hover:no-underline">
										{faq.question}
									</AccordionTrigger>
									<AccordionContent className="font-medium text-secondary/90">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
