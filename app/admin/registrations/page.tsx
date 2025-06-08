// app/admin/registrations/page.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce"; // Menggunakan custom hook
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { PaginatedRegistrations } from "@/types/registration";

export default function AdminRegistrationsPage() {
	const [data, setData] = useState<PaginatedRegistrations | null>(null);
	const [loading, setLoading] = useState(true);

	// State untuk filter dan paginasi
	const [page, setPage] = useState(1);
	const [limit] = useState(10);
	const [statusFilter, setStatusFilter] = useState("ALL");
	const [teamNameFilter, setTeamNameFilter] = useState("");
	const debouncedTeamName = useDebounce(teamNameFilter, 500);

	const fetchRegistrations = useCallback(async () => {
		setLoading(true);
		try {
			const result = await getAllRegistrations({
				page,
				limit,
				status: statusFilter === "ALL" ? undefined : statusFilter,
				teamName: debouncedTeamName,
			});
			setData(result);
		} catch (error) {
			console.error("Failed to fetch registrations:", error);
			setData(null); // Reset data on error
		} finally {
			setLoading(false);
		}
	}, [page, limit, statusFilter, debouncedTeamName]);

	useEffect(() => {
		fetchRegistrations();
	}, [fetchRegistrations]);

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "APPROVED":
				return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
			case "PENDING":
				return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
			case "REJECTED":
				return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
			default:
				return <Badge variant="secondary">Unknown</Badge>;
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold">Registrations Management</h1>
					<p className="mt-2 text-muted-foreground">
						Manage and review all competition registrations.
					</p>
				</div>
				<Button variant="outline" disabled>
					<Download className="mr-2 h-4 w-4" />
					Export Data (Coming Soon)
				</Button>
			</div>

			{/* Filters */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Filter className="h-5 w-5" />
						<span>Filter Registrations</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2">
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
						<div className="space-y-2">
							<Label>Status</Label>
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger>
									<SelectValue placeholder="All statuses" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="ALL">All Statuses</SelectItem>
									<SelectItem value="PENDING">Pending</SelectItem>
									<SelectItem value="APPROVED">Approved</SelectItem>
									<SelectItem value="REJECTED">Rejected</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Registrations Table */}
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
									data.data.map((reg) => (
										<TableRow key={reg.userId + reg.competition.id}>
											<TableCell className="font-medium">
												{reg.team.name}
											</TableCell>
											<TableCell>{reg.competition.name}</TableCell>
											<TableCell>{reg.details.institutionName}</TableCell>
											<TableCell>{reg.details.members.length}</TableCell>
											<TableCell>{getStatusBadge(reg.status)}</TableCell>
											<TableCell>
												<Button asChild variant="outline" size="sm" disabled>
													<Link href="#">
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
								disabled={page === 1}
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
								disabled={page === data.pageCount}
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
