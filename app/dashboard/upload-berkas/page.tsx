"use client";

import { useEffect } from "react";
import { useRegistration } from "@/hooks/useRegistration";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "@/components/common/PageLoader";
import { PageHeader } from "@/components/common/PageHeader";
import { DocumentUploadCard } from "@/components/features/upload/DocumentUploadCard";
import { DOCUMENT_TYPE } from "@/lib/constants";

export default function UploadBerkasPage() {
	const { isAuthenticated } = useAuth();
	const { registrations, loading, fetchMyRegistrations } = useRegistration();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	if (loading || !registrations) {
		return <PageLoader message="Loading your registration data..." />;
	}

	const uploadedDocuments = registrations?.[0]?.documents || [];

	return (
		<div className="space-y-8">
			<PageHeader
				title="Upload Berkas"
				description="Unggah dokumen wajib untuk kelengkapan tim Anda."
			/>
			<div className="grid gap-6 lg:grid-cols-2">
				<DocumentUploadCard
					title="Formulir Tim"
					description="Unggah formulir pendaftaran tim yang telah diisi."
					documentType={DOCUMENT_TYPE.VALIDATION}
					uploadedDocuments={uploadedDocuments}
				/>
				<DocumentUploadCard
					title="Berkas Mitra Cloudkilat"
					description="Unggah bukti pendaftaran atau penggunaan layanan dari Cloudkilat."
					documentType={DOCUMENT_TYPE.SPONSOR}
					uploadedDocuments={uploadedDocuments}
				/>
			</div>
		</div>
	);
}
