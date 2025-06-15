"use client";

import { useEffect } from "react";
import { useRegistration } from "@/hooks/useRegistration";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "@/components/common/PageLoader";
import { PageHeader } from "@/components/common/PageHeader";
import { DocumentUploadCard } from "@/components/features/upload/DocumentUploadCard";
import { DOCUMENT_TYPE, REGISTRATION_STATUS } from "@/lib/constants";
import { canUploadFinal } from "@/lib/permissions";
import { EmptyState } from "@/components/common/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function UploadFinalPage() {
	const { isAuthenticated } = useAuth();
	const { registrations, loading, fetchMyRegistrations } = useRegistration();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	if (loading || !registrations || registrations.length === 0) {
		return <PageLoader message="Verifying finalist status..." />;
	}

	const currentRegistration = registrations[0];

	const isUploadAllowed = canUploadFinal(currentRegistration);

	return (
		<div className="space-y-6">
			<PageHeader
				title="Upload Berkas Final"
				description="Selamat! Anda adalah finalis. Silakan unggah berkas final Anda di sini."
			/>
			<div className="max-w-2xl mx-auto">
				{isUploadAllowed ? (
					<DocumentUploadCard
						title="Submission Final"
						description="Unggah deck presentasi dan prototipe final Anda."
						documentType={DOCUMENT_TYPE.FINAL}
						uploadedDocuments={currentRegistration.documents}
						registrationStatus={currentRegistration.status}
						allowedStatuses={[REGISTRATION_STATUS.FINAL]}
						confirmEveryTime={true}
						confirmationText={{
							title: "Konfirmasi Pengumpulan Final",
							description:
								"Apakah Anda yakin ingin mengumpulkan berkas final ini? Pastikan ini adalah versi final dari karya Anda.",
							action: "Ya, Kumpulkan Final",
						}}
					/>
				) : (
					<Card>
						<CardContent className="pt-6">
							<EmptyState
								icon={Lock}
								title="Submission Closed"
								description="The submission period for the final stage has ended or your status is no longer 'FINAL'."
							/>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
