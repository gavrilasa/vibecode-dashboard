"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, ArrowRight, Phone } from "lucide-react";

interface CountdownCardProps {
	targetDate: Date;
	title: string;
}

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export function CountdownCard({ targetDate, title }: CountdownCardProps) {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;

		const timer = setInterval(() => {
			const now = new Date().getTime();
			const target = targetDate.getTime();
			const difference = target - now;

			if (difference > 0) {
				setTimeLeft({
					days: Math.floor(difference / (1000 * 60 * 60 * 24)),
					hours: Math.floor(
						(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
					),
					minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
					seconds: Math.floor((difference % (1000 * 60)) / 1000),
				});
			} else {
				setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
				clearInterval(timer);
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [targetDate, mounted]);

	const cardClassName =
		"w-full aspect-[3/2] flex flex-col justify-center bg-[url('https://storage.theaceundip.id/assets/Border-Sticky32-Card.webp')] bg-center bg-contain bg-no-repeat";

	if (!mounted) {
		return (
			<Card className={cardClassName}>
				<CardHeader className="flex flex-row items-center justify-center pb-2 space-y-0">
					<CardTitle className="text-lg font-semibold tracking-wide text-center font-lora text-secondary">
						{title}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex justify-center text-center gap-x-3">
						<div>
							<div className="text-2xl font-bold">--</div>
							<div className="text-xs text-muted-foreground">Days</div>
						</div>
						<div>
							<div className="text-2xl font-bold">--</div>
							<div className="text-xs text-muted-foreground">Hours</div>
						</div>
						<div>
							<div className="text-2xl font-bold">--</div>
							<div className="text-xs text-muted-foreground">Minutes</div>
						</div>
						<div>
							<div className="text-2xl font-bold">--</div>
							<div className="text-xs text-muted-foreground">Seconds</div>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className={cardClassName}>
			<CardHeader className="flex flex-row items-center justify-center pb-2 space-y-0">
				<CardTitle className="text-lg font-semibold tracking-wide text-center font-lora text-secondary">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center text-center gap-x-1">
					<div>
						<div className="text-5xl font-bold text-[#012A43] font-lora">
							{timeLeft.days}
						</div>
						<div className="text-xs text-muted-foreground">Days</div>
					</div>
					<div className="text-4xl text-[#012A43] font-bold">:</div>
					<div>
						<div className="text-5xl font-bold text-[#012A43] font-lora">
							{timeLeft.hours}
						</div>
						<div className="text-xs text-muted-foreground">Hour</div>
					</div>
					<div className="text-4xl text-[#012A43] font-bold">:</div>
					<div>
						<div className="text-5xl font-bold text-[#012A43] font-lora">
							{timeLeft.minutes}
						</div>
						<div className="text-xs text-muted-foreground">Minutes</div>
					</div>
					<div className="text-4xl text-[#012A43] font-bold">:</div>
					<div>
						<div className="text-5xl font-bold text-[#012A43] font-lora">
							{timeLeft.seconds}
						</div>
						<div className="text-xs text-muted-foreground">Seconds</div>
					</div>
				</div>
				<div className="flex flex-col justify-center gap-2">
					<div className="flex flex-row justify-center gap-2 pt-4 text-base">
						<Button
							variant="ghost"
							className="relative overflow-hidden text-base rounded-lg group"
							size="lg"
						>
							<a href="" target="_blank" rel="noopener noreferrer">
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
						<Link href="/auth/register" className="">
							<Button
								size="lg"
								className="relative p-1 overflow-hidden transition-colors duration-300 rounded-lg bg-primary hover:bg-orange-400 group"
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
					<Button className="px-12 mx-auto text-base text-white bg-secondary hover:bg-secondary/90">
						<Phone className="mr-2 size-5" />
						Contact Person
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
