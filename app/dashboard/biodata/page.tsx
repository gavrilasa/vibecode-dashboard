// app/dashboard/biodata/page.tsx

"use client";

import { useEffect } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration";
import {
	User,
	Mail,
	Phone,
	GraduationCap,
	Edit,
	FileText,
	Users,
	Info,
	Shield,
	Trophy,
} from "lucide-react";
import Link from "next/link";
import { PageLoader } from "@/components/common/PageLoader";
import { PageHeader } from "@/components/common/PageHeader";

export default function BiodataPage() {
	const { isAuthenticated } = useAuth();
	const { registrations, loading, fetchMyRegistrations } = useRegistration();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	if (loading || !registrations) {
		return (
			<div>
				<PageLoader />
			</div>
		);
	}

	if (registrations.length === 0) {
		return (
			<div>
				<Card>
					<CardHeader>
						<CardTitle>No Registration Found</CardTitle>
					</CardHeader>
					<CardContent>
						<p>You have not registered for any competition yet.</p>
						<Button asChild className="mt-4">
							<Link href="/competition/select">Select a Competition</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	const currentRegistration = registrations[0];
	const { team, competition, details, documents } = currentRegistration;

	return (
		<div>
			<div className="space-y-8">
				{/* Header */}
				<div className="flex flex-wrap items-center justify-between gap-4">
					<PageHeader
						title="Team & Biodata"
						description="View your team information, member details, and documents."
					/>

					<Button disabled>
						<Edit className="mr-2 h-4 w-4" />
						Edit Biodata (Coming Soon)
					</Button>
				</div>

				{/* Team & Competition Information */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Users className="h-5 w-5" />
							<span>Team & Competition Details</span>
						</CardTitle>
						<CardDescription>
							Your team is registered for the {competition.name}.
						</CardDescription>
					</CardHeader>
					<CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="flex items-start space-x-3">
							<Users className="h-5 w-5 mt-1 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									Team Name
								</p>
								<p className="text-lg font-semibold">{team.name}</p>
							</div>
						</div>
						<div className="flex items-start space-x-3">
							<Trophy className="h-5 w-5 mt-1 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									Competition
								</p>
								<p className="text-lg font-semibold">{competition.name}</p>
							</div>
						</div>
						<div className="flex items-start space-x-3">
							<GraduationCap className="h-5 w-5 mt-1 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium text-muted-foreground">
									Institution
								</p>
								<p className="text-lg font-semibold">
									{details.institutionName}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Member Details */}
				<Card>
					<CardHeader>
						<CardTitle>Member Details</CardTitle>
						<CardDescription>
							{/* PERBAIKAN: Menggunakan tanda kutip tunggal untuk menghindari error unescaped entities */}
							Information for all members of team &quot;{team.name}&quot;.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{details.members.map((member, index) => (
							<div key={member.id} className="rounded-lg border p-4 space-y-4">
								<h4 className="font-semibold text-foreground">
									Member {index + 1} {index === 0 ? "(Team Leader)" : ""}
								</h4>
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
									<div className="flex items-center space-x-2">
										<User className="h-4 w-4 text-muted-foreground" />
										<span>{member.memberName}</span>
									</div>
									<div className="flex items-center space-x-2">
										<Mail className="h-4 w-4 text-muted-foreground" />
										<span>{member.memberEmail}</span>
									</div>
									<div className="flex items-center space-x-2">
										<Phone className="h-4 w-4 text-muted-foreground" />
										<span>{member.memberPhone}</span>
									</div>
									<div className="flex items-center space-x-2">
										<Info className="h-4 w-4 text-muted-foreground" />
										<span>Student ID: {member.memberStudentId}</span>
									</div>
									<div className="flex items-center space-x-2">
										<Shield className="h-4 w-4 text-muted-foreground" />
										<span>Discord: {member.memberDiscordUsername}</span>
									</div>
								</div>
							</div>
						))}
					</CardContent>
				</Card>

				{/* Documents Status */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<FileText className="h-5 w-5" />
							<span>Uploaded Documents</span>
						</CardTitle>
						<CardDescription>
							Status of your uploaded documents for registration ID #
							{currentRegistration.id}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{documents.length > 0 ? (
							<div className="space-y-3">
								{documents.map((doc) => (
									<div
										key={doc.id}
										className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
									>
										<div>
											<p className="font-medium">{doc.filename}</p>
											<p className="text-sm text-gray-500 capitalize">
												{doc.type.toLowerCase()} Document
											</p>
										</div>
										<Badge variant="secondary">{doc.filetype}</Badge>
									</div>
								))}
							</div>
						) : (
							<div className="text-center py-6">
								<p className="text-muted-foreground">
									No documents have been uploaded yet.
								</p>
							</div>
						)}

						<div className="mt-6">
							<Button asChild variant="outline">
								<Link href="/dashboard/upload">Upload / Manage Documents</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
