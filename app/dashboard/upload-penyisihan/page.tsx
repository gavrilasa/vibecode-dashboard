// app/dashboard/upload-penyisihan/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRegistration } from "@/hooks/useRegistration";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "@/components/common/PageLoader";
import { PageHeader } from "@/components/common/PageHeader";
import { DocumentUploadCard } from "@/components/features/upload/DocumentUploadCard";
import {
	DOCUMENT_TYPE,
	COMPETITION_KEYS,
	REGISTRATION_STATUS,
} from "@/lib/constants";

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
			const isUIUX = currentRegistration.competition.name
				.toLowerCase()
				.includes(COMPETITION_KEYS.UI_UX);

			const allowedViewStatuses: string[] = [
				REGISTRATION_STATUS.APPROVED,
				REGISTRATION_STATUS.PRELIMINARY,
				REGISTRATION_STATUS.FINAL,
				REGISTRATION_STATUS.ELIMINATED,
			];
			const hasAllowedStatus = allowedViewStatuses.includes(
				currentRegistration.status
			);

			if (!isUIUX || !hasAllowedStatus) {
				router.push("/dashboard");
			}
		}
	}, [loading, currentRegistration, router]);

	if (loading || !currentRegistration) {
		return <PageLoader message="Verifying your submission stage..." />;
	}

	const uploadableStatuses: string[] = [
		REGISTRATION_STATUS.APPROVED,
		REGISTRATION_STATUS.PRELIMINARY,
	];

	if (!uploadableStatuses.includes(currentRegistration.status)) {
		return <PageLoader message="Redirecting..." />;
	}

	return (
		<div className="space-y-6">
			<PageHeader
				title="Unggah Berkas Penyisihan"
				description="Halaman ini khusus untuk pengumpulan berkas tahap penyisihan kompetisi UI/UX."
			/>
			<div className="max-w-2xl mx-auto">
				<DocumentUploadCard
					title="Submission Penyisihan"
					description="Unggah proposal atau hasil karya tahap penyisihan Anda di sini."
					documentType={DOCUMENT_TYPE.PRELIMINARY}
					allowedStatuses={[
						REGISTRATION_STATUS.APPROVED,
						REGISTRATION_STATUS.PRELIMINARY,
					]}
					uploadedDocuments={currentRegistration.documents}
					registrationStatus={currentRegistration.status}
					confirmEveryTime={true}
					confirmationText={{
						title: "Konfirmasi Pengumpulan Penyisihan",
						description:
							"Apakah Anda yakin ingin mengumpulkan berkas ini? Anda masih bisa mengubahnya sebelum batas waktu berakhir.",
						action: "Ya, Kumpulkan",
					}}
				/>
			</div>
		</div>
	);
}
