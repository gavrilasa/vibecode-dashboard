// app/admin/registrations/page.tsx

"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Search,
	Filter,
	Eye,
	Download,
	Loader2,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { getAllRegistrations } from "@/lib/registration";
import { PaginatedRegistrations, Registration } from "@/types/registration";
import { StatusBadge } from "@/components/common/StatusBadge";
import { PageHeader } from "@/components/common/PageHeader";
import { REGISTRATION_STATUS } from "@/lib/constants";
import { useCompetition } from "@/hooks/useCompetition";
import { PageLoader } from "@/components/common/PageLoader";
import { cn } from "@/lib/utils";

const capitalize = (s: string) => {
	if (typeof s !== "string" || s.length === 0) return s;
	return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

function RegistrationsPageContent() {
	const searchParams = useSearchParams();
	const { competitions, fetchCompetitions } = useCompetition();

	const [data, setData] = useState<PaginatedRegistrations | null>(null);
	const [loading, setLoading] = useState(true);

	const [page, setPage] = useState(1);
	const [limit] = useState(10);
	const [statusFilter, setStatusFilter] = useState("ALL");
	const [teamNameFilter, setTeamNameFilter] = useState("");
	const [competitionFilter, setCompetitionFilter] = useState("ALL");

	// 1. TAMBAHKAN STATE PENJAGA (GATEKEEPER)
	const [isInitialSyncComplete, setIsInitialSyncComplete] = useState(false);

	const debouncedTeamName = useDebounce(teamNameFilter, 500);
	const isCompetitionScoped = searchParams.has("competitionName");

	useEffect(() => {
		fetchCompetitions();
	}, [fetchCompetitions]);

	useEffect(() => {
		const status = searchParams.get("status") || "ALL";
		const teamName = searchParams.get("teamName") || "";
		const competitionName = searchParams.get("competitionName") || "ALL";

		setStatusFilter(status);
		setTeamNameFilter(teamName);
		setCompetitionFilter(competitionName);

		setIsInitialSyncComplete(true);
	}, [searchParams]);

	const fetchRegistrations = useCallback(async () => {
		setLoading(true);
		try {
			const result = await getAllRegistrations({
				page,
				limit,
				status: statusFilter === "ALL" ? undefined : statusFilter,
				teamName: debouncedTeamName,
				competitionName:
					competitionFilter === "ALL" ? undefined : competitionFilter,
			});
			setData(result);
		} catch (error) {
			console.error("Failed to fetch registrations:", error);
			setData(null);
		} finally {
			setLoading(false);
		}
	}, [page, limit, statusFilter, debouncedTeamName, competitionFilter]);

	useEffect(() => {
		if (isInitialSyncComplete) {
			fetchRegistrations();
		}
	}, [fetchRegistrations, isInitialSyncComplete]);

	useEffect(() => {
		setPage(1);
	}, [statusFilter, debouncedTeamName, competitionFilter]);

	if (!isInitialSyncComplete) {
		return <PageLoader />;
	}

	return (
		<div className="space-y-4">
			<PageHeader
				title="Registrations Management"
				description="Manage and review all competition registrations."
			>
				<Button variant="outline" disabled>
					<Download className="mr-2 h-4 w-4" />
					Export Data (Coming Soon)
				</Button>
			</PageHeader>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Filter className="h-5 w-5" />
						<span>Filter Registrations</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div
						className={cn(
							"grid gap-4",
							isCompetitionScoped ? "md:grid-cols-2" : "md:grid-cols-3"
						)}
					>
						<div className="space-y-2">
							<Label htmlFor="team-search">Team Name</Label>
							<div className="relative">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									id="team-search"
									placeholder="Search by team name..."
									value={teamNameFilter}
									onChange={(e) => setTeamNameFilter(e.target.value)}
									className="pl-10"
								/>
							</div>
						</div>
						{!isCompetitionScoped && (
							<div className="space-y-2">
								<Label>Competition</Label>
								<Select
									value={competitionFilter}
									onValueChange={setCompetitionFilter}
								>
									<SelectTrigger>
										<SelectValue placeholder="All competitions" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="ALL">All Competitions</SelectItem>
										{competitions.map((comp) => (
											<SelectItem key={comp.id} value={comp.name}>
												{comp.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						)}
						<div className="space-y-2">
							<Label>Status</Label>
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger>
									<SelectValue placeholder="All statuses" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="ALL">All Statuses</SelectItem>
									{Object.values(REGISTRATION_STATUS).map((status) => (
										<SelectItem key={status} value={status}>
											{capitalize(status)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Registrations ({data?.total || 0} found)</CardTitle>
					<CardDescription>
						Displaying page {data?.page || 1} of {data?.pageCount || 1}.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Team Name</TableHead>
									<TableHead>Competition</TableHead>
									<TableHead>Institution</TableHead>
									<TableHead>Members</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{loading ? (
									<TableRow>
										<TableCell colSpan={6} className="text-center py-10">
											<Loader2 className="h-6 w-6 animate-spin mx-auto" />
										</TableCell>
									</TableRow>
								) : data && data.data.length > 0 ? (
									data.data.map((reg: Registration) => (
										<TableRow key={reg.id}>
											<TableCell className="font-medium">
												{reg.team.name}
											</TableCell>
											<TableCell>{reg.competition.name}</TableCell>
											<TableCell>{reg.details.institutionName}</TableCell>
											<TableCell>{reg.details.members.length}</TableCell>
											<TableCell>
												<StatusBadge status={reg.status} />
											</TableCell>
											<TableCell>
												<Button asChild variant="outline" size="sm">
													<Link href={`/admin/registrations/${reg.id}`}>
														<Eye className="h-4 w-4 mr-1" /> View
													</Link>
												</Button>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={6} className="text-center py-10">
											No registrations found.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
					{data && data.pageCount > 1 && (
						<div className="flex items-center justify-end space-x-2 pt-4">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setPage((p) => Math.max(p - 1, 1))}
								disabled={page === 1 || loading}
							>
								<ChevronLeft className="h-4 w-4 mr-1" /> Previous
							</Button>
							<span className="text-sm font-medium">
								Page {data.page} of {data.pageCount}
							</span>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setPage((p) => Math.min(p + 1, data.pageCount))}
								disabled={page === data.pageCount || loading}
							>
								Next <ChevronRight className="h-4 w-4 ml-1" />
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

export default function AdminRegistrationsPage() {
	return (
		<Suspense fallback={<PageLoader />}>
			<RegistrationsPageContent />
		</Suspense>
	);
}
