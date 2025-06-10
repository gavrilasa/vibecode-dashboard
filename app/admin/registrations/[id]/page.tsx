// app/admin/registrations/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
	getRegistrationById,
	changeRegistrationStatus,
} from "@/lib/registration";
import { Registration } from "@/types/registration";
import { PageLoader } from "@/components/common/PageLoader";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	ArrowLeft,
	CheckCircle,
	Clock,
	FileText,
	Info,
	Users,
	XCircle,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { StatusBadge } from "@/components/common/StatusBadge";
import { REGISTRATION_STATUS } from "@/lib/constants";

export default function RegistrationDetailPage() {
	const params = useParams();
	const router = useRouter();
	const id = Number(params.id);

	const [registration, setRegistration] = useState<Registration | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedStatus, setSelectedStatus] = useState<string>("");

	useEffect(() => {
		if (id) {
			const fetchRegistration = async () => {
				setLoading(true);
				try {
					const data = await getRegistrationById(id);
					setRegistration(data);
					setSelectedStatus(data.status);
				} catch (err: any) {
					setError("Failed to fetch registration details.");
					toast.error(err.message || "An unexpected error occurred.");
				} finally {
					setLoading(false);
				}
			};
			fetchRegistration();
		}
	}, [id]);

	const handleStatusChange = async () => {
		if (!registration || !selectedStatus) return;

		try {
			await changeRegistrationStatus({
				registrationId: registration.id,
				status: selectedStatus,
			});
			toast.success("Registration status updated successfully!");
			// Refetch data to show updated status
			const data = await getRegistrationById(id);
			setRegistration(data);
		} catch (err: any) {
			toast.error(err.message || "Failed to update status.");
		}
	};

	if (loading) {
		return <PageLoader />;
	}

	if (error || !registration) {
		return (
			<div className="flex flex-col items-center justify-center h-full">
				<Alert variant="destructive" className="max-w-lg">
					<XCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						{error || "Could not find the requested registration."}
					</AlertDescription>
				</Alert>
				<Button asChild variant="link" className="mt-4">
					<Link href="/admin/registrations">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Registrations
					</Link>
				</Button>
			</div>
		);
	}

	const { team, competition, details, documents, status } = registration;

	return (
		<div className="space-y-6">
			<PageHeader
				title={`Registration: ${team.name}`}
				description={`Details for registration ID #${registration.id}`}
			>
				<Button asChild variant="outline">
					<Link href="/admin/registrations">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to List
					</Link>
				</Button>
			</PageHeader>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-6">
					{/* Team and Competition Info */}
					<Card>
						<CardHeader>
							<CardTitle>Team & Competition Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<p>
								<strong>Team Name:</strong> {team.name}
							</p>
							<p>
								<strong>Competition:</strong> {competition.name}
							</p>
							<p>
								<strong>Institution:</strong> {details.institutionName}
							</p>
							<p>
								<strong>Current Status:</strong> <StatusBadge status={status} />
							</p>
						</CardContent>
					</Card>

					{/* Member Details */}
					<Card>
						<CardHeader>
							<CardTitle>Member Details</CardTitle>
						</CardHeader>
						<CardContent>
							{details.members.map((member, index) => (
								<div key={member.id} className="mb-4 p-2 border-b">
									<p className="font-semibold">
										Member {index + 1} {index === 0 && "(Leader)"}
									</p>
									<p>Name: {member.memberName}</p>
									<p>Email: {member.memberEmail}</p>
									<p>Discord: {member.memberDiscordUsername}</p>
									<p>Student ID: {member.memberStudentId}</p>
									<p>Phone: {member.memberPhone}</p>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Uploaded Documents */}
					<Card>
						<CardHeader>
							<CardTitle>Uploaded Documents</CardTitle>
						</CardHeader>
						<CardContent>
							{documents.length > 0 ? (
								documents.map((doc) => (
									<div key={doc.id} className="flex items-center space-x-2">
										<FileText className="h-4 w-4" />
										<a
											href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${doc.filepath}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-500 hover:underline"
										>
											{doc.filename} ({doc.type})
										</a>
									</div>
								))
							) : (
								<p>No documents uploaded.</p>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Admin Actions */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Admin Actions</CardTitle>
							<CardDescription>
								Change the status of this registration.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<Select value={selectedStatus} onValueChange={setSelectedStatus}>
								<SelectTrigger>
									<SelectValue placeholder="Select a status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value={REGISTRATION_STATUS.PENDING}>
										Pending
									</SelectItem>
									<SelectItem value={REGISTRATION_STATUS.APPROVED}>
										Approved
									</SelectItem>
									<SelectItem value={REGISTRATION_STATUS.REJECTED}>
										Rejected
									</SelectItem>
									<SelectItem value={REGISTRATION_STATUS.PRELIMINARY}>
										Preliminary
									</SelectItem>
									<SelectItem value={REGISTRATION_STATUS.FINAL}>
										Final
									</SelectItem>
								</SelectContent>
							</Select>
							<Button onClick={handleStatusChange} className="w-full">
								Update Status
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
