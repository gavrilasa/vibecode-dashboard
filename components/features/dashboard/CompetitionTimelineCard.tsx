// File: components/features/dashboard/CompetitionTimelineCard.tsx

"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Circle, CircleDashed, ListCheck } from "lucide-react";
import { Competition } from "@/types/competition";
import { COMPETITION_KEYS } from "@/lib/constants";

const timelines = {
	[COMPETITION_KEYS.UI_UX]: [
		{ name: "Pendaftaran Gelombang 1", date: "10 – 19 Juni 2025" },
		{ name: "Pendaftaran Gelombang 2", date: "20 – 29 Juni 2025" },
		{ name: "Pendaftaran Gelombang 3", date: "30 Juni – 10 Juli 2025" },
		{ name: "Pendaftaran Extend", date: "11 Juli – 17 Juli 2025" },
		{ name: "Pengumpulan Karya", date: "11 Juli – 2 Agustus 2025" },
		{ name: "Pengumuman Finalis", date: "19 Agustus 2025" },
		{ name: "Technical Meeting Finalis", date: "24 Agustus 2025" },
		{ name: "Pelaksanaan Final", date: "31 Agustus 2025" },
		{ name: "Pengumuman Pemenang", date: "31 Agustus 2025" },
	],
	[COMPETITION_KEYS.FTL]: [
		{ name: "Pendaftaran", date: "10 Juni – 25 Agustus 2025" },
		{ name: "Technical Meeting (Online)", date: "31 Agustus 2025" },
		{ name: "Pelaksanaan Lomba", date: "6 September 2025" },
		{ name: "Pengumuman Pemenang", date: "6 September 2025" },
	],
	[COMPETITION_KEYS.CTF]: [
		{ name: "Pendaftaran Gelombang 1", date: "10 – 19 Juni 2025" },
		{ name: "Pendaftaran Gelombang 2", date: "20 – 29 Juni 2025" },
		{ name: "Pendaftaran Gelombang 3", date: "30 Juni – 10 Juli 2025" },
		{ name: "Pendaftaran Extend", date: "11 Juli – 15 Juli 2025" },
		{ name: "Technical Meeting Penyisihan (Online)", date: "16 Juli 2025" },
		{ name: "Warm Up", date: "18 Juli 2025" },
		{ name: "Babak Penyisihan", date: "19 Juli 2025" },
		{ name: "Pengumpulan Write Up", date: "19 Juli 2025" },
		{ name: "Pengumuman Finalis", date: "22 Juli 2025" },
		{ name: "Technical Meeting Finalis", date: "30 Agustus 2025" },
		{ name: "Pelaksanaan Final", date: "6 September 2025" },
		{ name: "Pengumuman Pemenang", date: "6 September 2025" },
	],
};

const monthMap: { [key: string]: number } = {
	januari: 0,
	februari: 1,
	maret: 2,
	april: 3,
	mei: 4,
	juni: 5,
	juli: 6,
	agustus: 7,
	september: 8,
	oktober: 9,
	november: 10,
	desember: 11,
};

const parseDateRange = (dateStr: string): [Date, Date] | [null, null] => {
	try {
		const cleanedStr = dateStr.replace(/\s+/g, " ").replace(/–/g, "-").trim();

		let match = cleanedStr.match(
			/^(\d{1,2})\s+([a-zA-Z]+)\s*-\s*(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})$/i
		);
		if (match) {
			const [, startDay, startMonthName, endDay, endMonthName, year] = match;
			const startDate = new Date(
				Date.UTC(
					parseInt(year),
					monthMap[startMonthName.toLowerCase()],
					parseInt(startDay)
				)
			);
			const endDate = new Date(
				Date.UTC(
					parseInt(year),
					monthMap[endMonthName.toLowerCase()],
					parseInt(endDay)
				)
			);
			endDate.setUTCHours(23, 59, 59, 999);
			return [startDate, endDate];
		}

		match = cleanedStr.match(
			/^(\d{1,2})\s*-\s*(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})$/i
		);
		if (match) {
			const [, startDay, endDay, monthName, year] = match;
			const month = monthMap[monthName.toLowerCase()];
			const startDate = new Date(
				Date.UTC(parseInt(year), month, parseInt(startDay))
			);
			const endDate = new Date(
				Date.UTC(parseInt(year), month, parseInt(endDay))
			);
			endDate.setUTCHours(23, 59, 59, 999);
			return [startDate, endDate];
		}

		match = cleanedStr.match(/^(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})$/i);
		if (match) {
			const [, day, monthName, year] = match;
			const date = new Date(
				Date.UTC(
					parseInt(year),
					monthMap[monthName.toLowerCase()],
					parseInt(day)
				)
			);
			const endDate = new Date(date);
			endDate.setUTCHours(23, 59, 59, 999);
			return [date, endDate];
		}

		console.error("Format tanggal tidak dikenali:", dateStr);
		return [null, null];
	} catch (e) {
		console.error("Error saat mem-parsing tanggal:", dateStr, e);
		return [null, null];
	}
};

const getStatus = (
	dateStr: string,
	now: Date
): "completed" | "active" | "upcoming" => {
	const [startDate, endDate] = parseDateRange(dateStr);
	if (!startDate || !endDate) return "upcoming";

	const nowDateOnly = new Date(
		Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
	);

	if (nowDateOnly > endDate) return "completed";
	if (nowDateOnly >= startDate && nowDateOnly <= endDate) return "active";
	return "upcoming";
};

const getStatusIcon = (status: "completed" | "active" | "upcoming") => {
	if (status === "completed")
		return <CheckCircle className="w-5 h-5 text-green-500" />;
	if (status === "active")
		return <Circle className="w-5 h-5 text-primary animate-pulse" />;
	return <CircleDashed className="w-5 h-5 text-gray-400" />;
};

interface CompetitionTimelineCardProps {
	competition: Omit<Competition, "batches">;
}

export function CompetitionTimelineCard({
	competition,
}: CompetitionTimelineCardProps) {
	const [now, setNow] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setNow(new Date()), 60000);
		return () => clearInterval(timer);
	}, []);

	const competitionKey = useMemo(() => {
		const name = competition.name.toLowerCase();
		if (name.includes(COMPETITION_KEYS.FTL)) return COMPETITION_KEYS.FTL;
		if (name.includes(COMPETITION_KEYS.CTF)) return COMPETITION_KEYS.CTF;
		if (name.includes(COMPETITION_KEYS.UI_UX)) return COMPETITION_KEYS.UI_UX;
		return COMPETITION_KEYS.UI_UX;
	}, [competition.name]);

	const activeTimeline = timelines[competitionKey] || [];

	return (
		<Card id="timeline">
			<CardHeader className="pb-3 space-y-2">
				<CardTitle className="flex items-center space-x-2">
					<ListCheck className="w-5 h-5 text-primary" />
					<span>Alur Kompetisi</span>
				</CardTitle>
				<CardDescription>
					Alur dan jadwal dari awal hingga akhir kompetisi.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className="space-y-4">
					{activeTimeline.map((stage) => {
						const status = getStatus(stage.date, now);
						return (
							<li key={stage.name} className="flex items-start space-x-3">
								<div className="flex-shrink-0 mt-0.5">
									{getStatusIcon(status)}
								</div>
								<div>
									<p
										className={
											status === "active"
												? "font-semibold text-primary"
												: "text-foreground"
										}
									>
										{stage.name}
									</p>
									<p className="text-sm text-muted-foreground">{stage.date}</p>
								</div>
							</li>
						);
					})}
				</ul>
			</CardContent>
		</Card>
	);
}
