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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	ArrowLeft,
	FileText,
	XCircle,
	User,
	Mail,
	Phone,
	Info,
	Download,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { StatusBadge } from "@/components/common/StatusBadge";
import { REGISTRATION_STATUS } from "@/lib/constants";
import { capitalize } from "@/lib/utils";

export default function RegistrationDetailPage() {
	const params = useParams();
	const router = useRouter();
	const id = Number(params.id);

	const [registration, setRegistration] = useState<Registration | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedStatus, setSelectedStatus] = useState<string>("");
	const [isConfirming, setIsConfirming] = useState(false);

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
			const data = await getRegistrationById(id);
			setRegistration(data);
		} catch (err: any) {
			toast.error(err.message || "Failed to update status.");
		}
	};

	const handleDownload = async (url: string, filename: string) => {
		const toastId = toast.loading(`Downloading ${filename}...`);
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(
					`Download failed: Server responded with ${response.status}`
				);
			}
			const blob = await response.blob();
			const blobUrl = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = blobUrl;
			link.setAttribute("download", filename);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(blobUrl);
			toast.success(`${filename} downloaded successfully.`, { id: toastId });
		} catch (error: any) {
			console.error("Download error:", error);
			toast.error(error.message || "Could not download file.", { id: toastId });
		}
	};

	if (loading) {
		return <PageLoader />;
	}

	if (error || !registration) {
		return (
			<div className="flex flex-col items-center justify-center h-full">
				<Alert variant="destructive" className="max-w-lg">
					<XCircle className="w-4 h-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						{error || "Could not find the requested registration."}
					</AlertDescription>
				</Alert>
				<Button asChild variant="link" className="mt-4">
					<Link href="/admin/registrations">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Registrations
					</Link>
				</Button>
			</div>
		);
	}

	const { team, competition, details, documents, status } = registration;
	const isStatusChanged = selectedStatus !== status;

	return (
		<div className="space-y-4">
			<PageHeader
				title={`Registration: ${team.name}`}
				description={`Details for registration ID #${registration.id}`}
			>
				<Button asChild variant="outline">
					<Link href="/admin/registrations">
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to List
					</Link>
				</Button>
			</PageHeader>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<div className="space-y-4 lg:col-span-2">
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
							<div>
								<strong>Current Status:</strong> <StatusBadge status={status} />
							</div>
						</CardContent>
					</Card>

					{/* Member Details */}
					<Card>
						<CardHeader>
							<CardTitle>Member Details</CardTitle>
							<CardDescription>
								Information for all members of team &quot;{team.name}&quot;.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							{details.members.map((member, index) => (
								<div
									key={member.id}
									className="rounded-lg border p-4 space-y-4"
								>
									<h4 className="font-semibold text-foreground">
										Member {index + 1} {index === 0 ? "(Team Leader)" : ""}
									</h4>
									<div className="grid grid-cols-1 gap-2 text-sm">
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
									</div>
								</div>
							))}
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-4">
							<CardTitle>Uploaded Documents</CardTitle>
						</CardHeader>
						<CardContent>
							{documents.length > 0 ? (
								<div className="space-y-3">
									{documents.map((doc) => {
										const docUrl = `https://storage.theaceundip.id/${doc.filepath}`;
										return (
											<div className="space-y-1" key={doc.id}>
												<span className="font-medium">
													{capitalize(doc.type)} Document
												</span>
												<div
													key={doc.id}
													className="flex items-center justify-between p-2 border rounded-md"
												>
													<div className="flex items-center space-x-2 overflow-hidden">
														<FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
														<span
															className="font-medium truncate"
															title={doc.filename}
														>
															{doc.filename}
														</span>
													</div>
													<div className="flex items-center space-x-2 flex-shrink-0">
														<Button
															variant="outline"
															size="sm"
															onClick={() =>
																handleDownload(docUrl, doc.filename)
															}
														>
															<Download className="h-4 w-4 md:mr-1" />
															<span className="hidden md:inline">Download</span>
														</Button>
													</div>
												</div>
											</div>
										);
									})}
								</div>
							) : (
								<p>No documents uploaded.</p>
							)}
						</CardContent>
					</Card>
				</div>

				<div className="lg:sticky lg:top-6 space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Change Registration Status</CardTitle>
							<CardDescription>
								Change the status of this registration.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{/* 3. Perubahan utama ada di sini */}
							<Select value={selectedStatus} onValueChange={setSelectedStatus}>
								<SelectTrigger>
									<SelectValue placeholder="Select a status" />
								</SelectTrigger>
								<SelectContent>
									{Object.values(REGISTRATION_STATUS)
										.filter(
											(statusValue) =>
												statusValue !== REGISTRATION_STATUS.PENDING &&
												statusValue !== REGISTRATION_STATUS.REVIEW
										)
										.map((statusValue) => (
											<SelectItem key={statusValue} value={statusValue}>
												{statusValue.charAt(0) +
													statusValue.slice(1).toLowerCase()}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
							<Button
								onClick={() => setIsConfirming(true)}
								className="w-full text-white disabled:bg-slate-400"
								disabled={!isStatusChanged}
							>
								Update Status
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
			<AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This will change the registration status from{" "}
							<strong>{status}</strong> to <strong>{selectedStatus}</strong>.
							This action may notify the user.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleStatusChange}
							className="text-white"
						>
							Yes, Update Status
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
