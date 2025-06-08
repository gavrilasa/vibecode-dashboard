// app/dashboard/biodata/edit/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration";
import {
	Loader2,
	ArrowLeft,
	User,
	Users,
	GraduationCap,
	Mail,
	Phone,
	Shield,
	Info,
} from "lucide-react";
import Link from "next/link";

export default function EditBiodataPage() {
	const { isAuthenticated } = useAuth();
	const { registrations, loading, fetchMyRegistrations } = useRegistration();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	if (loading || !registrations) {
		return (
			<div>
				<div className="flex h-full w-full items-center justify-center">
					<Loader2 className="h-8 w-8 animate-spin" />
				</div>
			</div>
		);
	}

	if (registrations.length === 0) {
		// Arahkan ke halaman kompetisi jika belum ada registrasi
		router.push("/competition/select");
		return null;
	}

	// Mengambil data dari registrasi pertama yang ditemukan
	const currentRegistration = registrations[0];
	const { details, team } = currentRegistration;

	return (
		<div>
			<div className="mx-auto space-y-6">
				{/* Header */}
				<div className="flex items-center space-x-4">
					<Button asChild variant="ghost" size="icon">
						<Link href="/dashboard/biodata">
							<ArrowLeft className="h-5 w-5" />
							<span className="sr-only">Back to Biodata</span>
						</Link>
					</Button>
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							View Registration Details
						</h1>
						<p className="mt-1 text-gray-600 dark:text-gray-400">
							This is a read-only view of your team and member information.
						</p>
					</div>
				</div>

				<Alert>
					<Info className="h-4 w-4" />
					<AlertTitle>Read-Only Mode</AlertTitle>
					<AlertDescription>
						You cannot edit this information directly. For any changes, please
						contact the event committee.
					</AlertDescription>
				</Alert>

				<Card>
					<CardHeader>
						<CardTitle>Team & Institution Information</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="teamName">Team Name</Label>
							<Input id="teamName" value={team.name} disabled />
						</div>
						<div className="space-y-2">
							<Label htmlFor="institutionName">Institution / University</Label>
							<Input
								id="institutionName"
								value={details.institutionName}
								disabled
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Member Details</CardTitle>
						<CardDescription>
							Detailed information for all members of team &apos;{team.name}
							&apos;.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{details.members.map((member, index) => (
							<div key={member.id}>
								<div className="flex items-center mb-4">
									<div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
										<User className="h-5 w-5 text-muted-foreground" />
									</div>
									<h3 className="text-lg font-semibold">
										Member {index + 1}{" "}
										{index === 0 ? (
											<Badge variant="secondary">Team Leader</Badge>
										) : (
											""
										)}
									</h3>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pl-11">
									<div className="space-y-2">
										<Label htmlFor={`memberName-${member.id}`}>Full Name</Label>
										<Input
											id={`memberName-${member.id}`}
											value={member.memberName}
											disabled
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor={`memberEmail-${member.id}`}>
											Email Address
										</Label>
										<Input
											id={`memberEmail-${member.id}`}
											value={member.memberEmail}
											disabled
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor={`memberPhone-${member.id}`}>
											Phone Number
										</Label>
										<Input
											id={`memberPhone-${member.id}`}
											value={member.memberPhone}
											disabled
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor={`memberStudentId-${member.id}`}>
											Student ID
										</Label>
										<Input
											id={`memberStudentId-${member.id}`}
											value={member.memberStudentId}
											disabled
										/>
									</div>
									<div className="space-y-2 md:col-span-2">
										<Label htmlFor={`memberDiscord-${member.id}`}>
											Discord Username
										</Label>
										<Input
											id={`memberDiscord-${member.id}`}
											value={member.memberDiscordUsername}
											disabled
										/>
									</div>
								</div>
								{index < details.members.length - 1 && (
									<Separator className="mt-6" />
								)}
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
