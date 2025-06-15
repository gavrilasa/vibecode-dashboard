// app/dashboard/upload-penyisihan/page.tsx

"use client";

import { useEffect } from "react";
import { useRegistration } from "@/hooks/useRegistration";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "@/components/common/PageLoader";
import { PageHeader } from "@/components/common/PageHeader";
import { DocumentUploadCard } from "@/components/features/upload/DocumentUploadCard";
import { DOCUMENT_TYPE, REGISTRATION_STATUS } from "@/lib/constants";
import { canUploadPenyisihan } from "@/lib/permissions";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function UploadPenyisihanPage() {
	const { isAuthenticated } = useAuth();
	const { registrations, loading, fetchMyRegistrations } = useRegistration();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	if (loading || !registrations || registrations.length === 0) {
		return <PageLoader message="Loading submission data..." />;
	}

	const currentRegistration = registrations[0];

	// Gunakan fungsi izin terpusat untuk menentukan apakah upload masih diizinkan
	const isUploadAllowed = canUploadPenyisihan(currentRegistration);

	return (
		<div className="space-y-6">
			<PageHeader
				title="Unggah Berkas Penyisihan"
				description="Halaman ini khusus untuk pengumpulan berkas tahap penyisihan kompetisi UI/UX."
			/>
			<div className="max-w-2xl mx-auto">
				{isUploadAllowed ? (
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
				) : (
					<Card>
						<CardContent className="pt-6">
							<EmptyState
								icon={Lock}
								title="Submission Closed"
								description="The submission period for the preliminary stage has ended."
							/>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
