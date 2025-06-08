// app/dashboard/upload/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { UploadForm } from "@/components/features/upload/UploadForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration"; // Impor hook untuk data dinamis
import { FileText, Upload, Info, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EmptyState } from "@/components/common/EmptyState";
import { COMPETITION_KEYS } from "@/lib/constants";

export default function UploadPage() {
	const { isAuthenticated } = useAuth();
	const { registrations, loading, fetchMyRegistrations } = useRegistration();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	// Ekstrak data registrasi pertama yang relevan
	const currentRegistration =
		registrations && registrations.length > 0 ? registrations[0] : null;
	const competitionName = currentRegistration?.competition.name || "";
	const uploadedDocuments = currentRegistration?.documents || [];

	useEffect(() => {
		if (loading) return;
		if (registrations) {
			if (!competitionName.toLowerCase().includes(COMPETITION_KEYS.UI_UX)) {
				// <-- Gunakan konstanta
				router.push("/dashboard");
			}
		}
	}, [loading, registrations, competitionName, router]);

	// Tampilkan loading spinner selama data diambil atau proses redirect
	if (loading || !registrations) {
		return (
			<div>
				<div className="flex h-full w-full items-center justify-center">
					<Loader2 className="h-8 w-8 animate-spin" />
				</div>
			</div>
		);
	}

	// Jika user tidak terdaftar di kompetisi UI/UX, tampilkan pesan atau biarkan redirect bekerja
	if (!competitionName.toLowerCase().includes("ui/ux")) {
		return (
			<div>
				<div className="flex h-full w-full items-center justify-center">
					<Card className="w-full max-w-md">
						<CardHeader>
							<CardTitle>Access Denied</CardTitle>
							<CardDescription>
								This page is only for UI/UX Competition participants.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Redirecting you to the dashboard...</p>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="space-y-8">
				{/* Header */}
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Upload Documents
					</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Upload required documents for **{competitionName}**
					</p>
				</div>

				<div className="grid gap-6 lg:grid-cols-2">
					{/* Upload Form */}
					<UploadForm competitionName={competitionName} />

					{/* Upload Instructions */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Info className="h-5 w-5" />
								<span>Upload Guidelines</span>
							</CardTitle>
							<CardDescription>
								Please read these guidelines before uploading.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-3">
								<h4 className="font-semibold">File Requirements:</h4>
								<ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
									<li>Only PDF files are accepted.</li>
									<li>Maximum file size is typically 10MB.</li>
									<li>Ensure files are clearly legible.</li>
									<li>
										Use descriptive filenames (e.g., `StudentID_JohnDoe.pdf`).
									</li>
								</ul>
							</div>

							<div className="space-y-3">
								<h4 className="font-semibold">Document Types:</h4>
								<ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
									<li>
										<strong>Validation:</strong> Identity card, student ID card,
										etc.
									</li>
									<li>
										<strong>Preliminary:</strong> Your initial design submission
										files.
									</li>
									<li>
										<strong>Final:</strong> Your final design and presentation
										files.
									</li>
								</ul>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Uploaded Documents */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<FileText className="h-5 w-5" />
							<span>My Uploaded Documents</span>
						</CardTitle>
						<CardDescription>
							A list of documents you have already uploaded for this
							competition.
						</CardDescription>
					</CardHeader>
					<CardContent>
						{uploadedDocuments.length > 0 ? (
							<div className="space-y-3">
								{uploadedDocuments.map((doc) => (
									<div
										key={doc.id}
										className="flex items-center justify-between rounded-lg border p-4"
									>
										<div className="flex items-center space-x-4">
											<Upload className="h-5 w-5 text-muted-foreground" />
											<div>
												<p className="font-medium">{doc.filename}</p>
												<p className="text-sm text-muted-foreground capitalize">
													{doc.type.toLowerCase().replace("_", " ")}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="text-center text-muted-foreground py-8">
								<EmptyState
									title="No Documents Found"
									description="You haven't uploaded any documents yet."
								/>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
