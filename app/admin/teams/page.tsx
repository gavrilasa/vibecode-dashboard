// app/admin/teams/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Search, Filter, Eye, Users, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import { Team } from "@/types/team";
import { getAllTeams } from "@/lib/team";
import { EmptyState } from "@/components/common/EmptyState";

export default function AdminTeamsPage() {
	const [allTeams, setAllTeams] = useState<Team[]>([]);
	const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	useEffect(() => {
		const fetchTeams = async () => {
			setLoading(true);
			try {
				const teams = await getAllTeams();
				setAllTeams(teams);
				setFilteredTeams(teams);
			} catch (error) {
				console.error("Failed to fetch teams:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchTeams();
	}, []);

	useEffect(() => {
		const filtered = allTeams.filter(
			(team) =>
				team.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
				team.competition.name
					.toLowerCase()
					.includes(debouncedSearchTerm.toLowerCase())
		);
		setFilteredTeams(filtered);
	}, [debouncedSearchTerm, allTeams]);

	return (
		<div className="space-y-6">
			{/* Header */}
			<PageHeader
				title="Teams Management"
				description="Manage and monitor all competition teams."
			>
				<Button variant="outline" disabled>
					<Download className="mr-2 h-4 w-4" />
					Export Data (Coming Soon)
				</Button>
			</PageHeader>

			{/* Filters */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Filter className="h-5 w-5" />
						<span>Filter Teams</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="max-w-md">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search by team or competition name..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Teams Table */}
			<Card>
				<CardHeader>
					<CardTitle>
						Teams ({filteredTeams.length} of {allTeams.length} found)
					</CardTitle>
					<CardDescription>
						List of all registered teams across all competitions.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Team Name</TableHead>
									<TableHead>Competition</TableHead>
									<TableHead>Max Members</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{loading ? (
									<TableRow>
										<TableCell colSpan={4} className="text-center py-10">
											<Loader2 className="h-6 w-6 animate-spin mx-auto" />
										</TableCell>
									</TableRow>
								) : filteredTeams.length > 0 ? (
									filteredTeams.map((team) => (
										<TableRow key={team.id}>
											<TableCell className="font-medium">{team.name}</TableCell>
											<TableCell>{team.competition.name}</TableCell>
											<TableCell>{team.competition.maxMembers}</TableCell>
											<TableCell>
												<Button asChild variant="outline" size="sm" disabled>
													<Link href="#">
														{" "}
														{/* `/admin/teams/${team.id}` */}
														<Eye className="h-4 w-4 mr-1" />
														View Details
													</Link>
												</Button>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={4} className="text-center py-10">
											<EmptyState
												title="No Teams Found"
												description="There are no teams matching your search criteria."
											/>
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
