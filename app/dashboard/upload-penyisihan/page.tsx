"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRegistration } from "@/hooks/useRegistration";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "@/components/common/PageLoader";
import { PageHeader } from "@/components/common/PageHeader";
import { DocumentUploadCard } from "@/components/features/upload/DocumentUploadCard";
import { DOCUMENT_TYPE, COMPETITION_KEYS } from "@/lib/constants";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function UploadPenyisihanPage() {
	const { isAuthenticated } = useAuth();
	const { registrations, loading, fetchMyRegistrations } = useRegistration();
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	const currentRegistration = registrations?.[0];

	useEffect(() => {
		if (!loading && currentRegistration) {
			if (
				!currentRegistration.competition.name
					.toLowerCase()
					.includes(COMPETITION_KEYS.UI_UX)
			) {
				router.push("/dashboard");
			}
		}
	}, [loading, currentRegistration, router]);

	if (loading || !currentRegistration) {
		return <PageLoader message="Verifying access..." />;
	}

	if (
		!currentRegistration.competition.name
			.toLowerCase()
			.includes(COMPETITION_KEYS.UI_UX)
	) {
		return <PageLoader message="Redirecting..." />;
	}

	return (
		<div className="space-y-8">
			<PageHeader
				title="Upload Berkas Penyisihan"
				description="Halaman ini khusus untuk pengumpulan berkas tahap penyisihan kompetisi UI/UX."
			/>
			<div className="max-w-2xl mx-auto">
				<DocumentUploadCard
					title="Submission Penyisihan"
					description="Unggah proposal atau hasil karya tahap penyisihan Anda di sini."
					documentType={DOCUMENT_TYPE.PRELIMINARY}
					uploadedDocuments={currentRegistration.documents}
				/>
			</div>
		</div>
	);
}
