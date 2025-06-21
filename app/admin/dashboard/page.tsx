// app/admin/dashboard/page.tsx

"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users, Clock, AlertCircle, Activity, CheckCircle } from "lucide-react";

import { getAllRegistrations } from "@/lib/registration";
import { Registration } from "@/types/registration";
import { PageHeader } from "@/components/common/PageHeader";
import { PageLoader } from "@/components/common/PageLoader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { REGISTRATION_STATUS } from "@/lib/constants";

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartConfig,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import {
	Bar,
	BarChart as RechartsBarChart,
	Pie,
	PieChart as RechartsPieChart,
	XAxis,
	YAxis,
	Tooltip,
	Cell,
	Label,
	LabelList,
	CartesianGrid,
} from "recharts";

const chartConfig = {
	CTF: { label: "CTF", color: "hsl(200, 78%, 20%)" },
	"UI/UX": { label: "UI/UX", color: "hsl(30, 87%, 54%)" },
	FTL: { label: "FTL", color: "hsl(184, 41%, 36%)" },
	APPROVED: { label: "Approved", color: "hsl(142.1, 76.2%, 36.3%)" },
	PENDING: { label: "Pending", color: "hsl(47.9, 95.8%, 53.1%)" },
	REVIEW: { label: "Review", color: "hsl(215, 21%, 35%)" },
	REJECTED: { label: "Rejected", color: "hsl(0, 84.2%, 60.2%)" },
	ELIMINATED: { label: "Eliminated", color: "hsl(0, 84.2%, 60.2%)" },
	PRELIMINARY: { label: "Preliminary", color: "hsl(217.2, 91.2%, 59.8%)" },
	FINAL: { label: "Final", color: "hsl(262.1, 83.3%, 57.8%)" },
	label: {
		color: "hsl(var(--card-foreground))",
	},
} satisfies ChartConfig;

export default function AdminDashboardPage() {
	const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const firstPage = await getAllRegistrations({ page: 1, limit: 100 });
				let allData = firstPage.data;

				if (firstPage.pageCount > 1) {
					const pagePromises: Promise<any>[] = [];
					for (let i = 2; i <= firstPage.pageCount; i++) {
						pagePromises.push(getAllRegistrations({ page: i, limit: 100 }));
					}
					const subsequentPages = await Promise.all(pagePromises);
					subsequentPages.forEach((page) => {
						allData = [...allData, ...page.data];
					});
				}

				setAllRegistrations(allData);
			} catch (err: any) {
				console.error("Failed to fetch admin dashboard data:", err);
				setError(err.message || "Could not fetch dashboard data.");
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	const { stats, competitionData, statusData, pendingTeams, recentActivity } =
		useMemo(() => {
			if (!allRegistrations.length)
				return {
					stats: { total: 0, pending: 0, approved: 0 },
					competitionData: [],
					statusData: [],
					pendingTeams: [],
					recentActivity: [],
				};

			const sortedByDateDesc = [...allRegistrations].sort(
				(a, b) => new Date(b.id).getTime() - new Date(a.id).getTime()
			);

			const statusCounts = allRegistrations.reduce((acc, reg) => {
				acc[reg.status] = (acc[reg.status] || 0) + 1;
				return acc;
			}, {} as Record<string, number>);

			const competitionCounts = allRegistrations.reduce((acc, reg) => {
				const name = reg.competition.name.includes("UI/UX")
					? "UI/UX"
					: reg.competition.name.split(" ")[0];
				acc[name] = (acc[name] || 0) + 1;
				return acc;
			}, {} as Record<string, number>);

			const pending = allRegistrations
				.filter((r) => r.status === REGISTRATION_STATUS.REVIEW)
				.sort((a, b) => new Date(a.id).getTime() - new Date(b.id).getTime());

			return {
				stats: {
					total: allRegistrations.length,
					pending: statusCounts.REVIEW || 0,
					approved: statusCounts.APPROVED || 0,
				},
				competitionData: Object.entries(competitionCounts).map(
					([name, count]) => ({
						name,
						teams: count,
						fill:
							chartConfig[name as keyof typeof chartConfig]?.color || "#888888",
					})
				),
				statusData: Object.entries(statusCounts).map(([name, count]) => ({
					name,
					value: count,
					fill:
						chartConfig[name as keyof typeof chartConfig]?.color || "#888888",
				})),
				pendingTeams: pending,
				recentActivity: sortedByDateDesc.slice(0, 5),
			};
		}, [allRegistrations]);

	if (loading) return <PageLoader />;
	if (error)
		return (
			<div className="container mx-auto p-4">
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Failed to Load Dashboard</AlertTitle>
					<AlertDescription>
						{error} Please try refreshing the page.
					</AlertDescription>
				</Alert>
			</div>
		);

	return (
		<div className="space-y-6">
			<PageHeader
				title="Admin Dashboard"
				description="Welcome! Here's the current state of The ACE Competition."
			/>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<Card className="border-primary/50 ring-1 ring-primary/20">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-md font-semibold">
							Need to Review
						</CardTitle>
						<Clock className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-primary">
							{stats.pending}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-md font-semibold">
							Teams Approved
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">{stats.approved}</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-md font-semibold">
							Total Registrations
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">{stats.total}</div>
					</CardContent>
				</Card>

				<Card className="md:row-span-2">
					<CardHeader>
						<CardTitle>Registration Status</CardTitle>
						<CardDescription>
							Distribution of all team statuses.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center">
						<ChartContainer
							config={chartConfig}
							className="h-[250px] w-full aspect-square"
						>
							<RechartsPieChart>
								<Tooltip
									cursor={false}
									content={<ChartTooltipContent hideIndicator />}
								/>
								<Pie
									data={statusData}
									dataKey="value"
									nameKey="name"
									innerRadius={50}
									strokeWidth={2}
								>
									<Label
										content={({ viewBox }) => {
											if (viewBox && "cx" in viewBox && "cy" in viewBox) {
												return (
													<text
														x={viewBox.cx}
														y={viewBox.cy}
														textAnchor="middle"
														dominantBaseline="middle"
													>
														<tspan
															x={viewBox.cx}
															y={viewBox.cy}
															className="fill-foreground text-3xl font-bold"
														>
															{stats.total.toLocaleString()}
														</tspan>
														<tspan
															x={viewBox.cx}
															y={(viewBox.cy || 0) + 20}
															className="fill-muted-foreground"
														>
															Teams
														</tspan>
													</text>
												);
											}
										}}
									/>
								</Pie>
								<ChartLegend
									content={<ChartLegendContent nameKey="name" />}
									className="flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
								/>
							</RechartsPieChart>
						</ChartContainer>
					</CardContent>
				</Card>
				<Card className="md:col-span-3">
					<CardHeader>
						<CardTitle>Registrations by Competition</CardTitle>
						<CardDescription>
							Total number of teams registered in each competition.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[120px] w-full">
							<RechartsBarChart
								accessibilityLayer
								data={competitionData}
								layout="vertical"
								margin={{
									right: 16,
									left: 10,
								}}
							>
								<CartesianGrid horizontal={false} />
								<YAxis
									dataKey="name"
									type="category"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={(value) => value.slice(0, 3)}
									hide
								/>
								<XAxis dataKey="teams" type="number" hide />
								<ChartTooltip
									cursor={false}
									content={<ChartTooltipContent indicator="line" />}
								/>
								<Bar dataKey="teams" layout="vertical" radius={4}>
									<LabelList
										dataKey="name"
										position="insideLeft"
										offset={8}
										className="fill-white text-sm font-semibold"
										fontSize={12}
									/>
									<LabelList
										dataKey="teams"
										position="right"
										offset={12}
										className="fill-foreground text-base font-bold"
										fontSize={12}
									/>
									{competitionData.map((entry) => (
										<Cell key={`cell-${entry.name}`} fill={entry.fill} />
									))}
								</Bar>
							</RechartsBarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>

			{/* Action Queues */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div>
							<CardTitle>Teams Awaiting Review</CardTitle>
							<CardDescription>
								Oldest pending teams listed first.
							</CardDescription>
						</div>
						{pendingTeams.length > 0 && (
							<Button
								asChild
								variant="secondary"
								size="sm"
								className="shrink-0"
							>
								<Link href="/admin/registrations?status=REVIEW">
									View All ({pendingTeams.length})
								</Link>
							</Button>
						)}
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{pendingTeams.length > 0 ? (
								pendingTeams.slice(0, 5).map((reg) => (
									<div
										key={reg.id}
										className="flex items-center justify-between"
									>
										<div className="flex items-center gap-3">
											<StatusBadge status={reg.status} />
											<div className="flex flex-col">
												<span className="font-semibold text-sm">
													{reg.team.name}
												</span>
												<span className="text-xs text-muted-foreground">
													{reg.competition.name}
												</span>
											</div>
										</div>
										<Button asChild variant="outline" size="sm">
											<Link href={`/admin/registrations/${reg.id}`}>
												Review
											</Link>
										</Button>
									</div>
								))
							) : (
								<div className="text-center py-8 text-muted-foreground">
									<CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
									<p>No teams are currently pending review. Great job!</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
						<CardDescription>The latest teams to register.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentActivity.length > 0 ? (
								recentActivity.map((reg) => (
									<div key={reg.id} className="flex items-center">
										<Activity className="h-4 w-4 text-muted-foreground mr-3 shrink-0" />
										<div className="text-sm">
											<span className="font-semibold">{reg.team.name}</span>
											<span className="text-muted-foreground">
												{" "}
												registered for {reg.competition.name}.
											</span>
										</div>
									</div>
								))
							) : (
								<p className="text-sm text-center py-8 text-muted-foreground">
									No registration activity yet.
								</p>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
