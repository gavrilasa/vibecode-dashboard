// app/dashboard/upload-berkas/page.tsx

"use client";

import { useEffect } from "react";
import { useRegistration } from "@/hooks/useRegistration";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "@/components/common/PageLoader";
import { PageHeader } from "@/components/common/PageHeader";
import { DocumentUploadCard } from "@/components/features/upload/DocumentUploadCard";
import { DOCUMENT_TYPE, REGISTRATION_STATUS } from "@/lib/constants";
import { changeRegistrationStatus } from "@/lib/registration";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function UploadBerkasPage() {
	const { isAuthenticated } = useAuth();
	const { registrations, loading, fetchMyRegistrations } = useRegistration();

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	if (loading || !registrations || registrations.length === 0) {
		return <PageLoader message="Loading your registration data..." />;
	}

	const currentRegistration = registrations[0];
	const { documents, status, id: registrationId } = currentRegistration;

	// Fungsi untuk menangani final submit
	const handleFinalSubmit = async () => {
		try {
			await changeRegistrationStatus({
				registrationId: registrationId,
				status: REGISTRATION_STATUS.REVIEW,
			});
			toast.success("Registration submitted for review!", {
				description: "Your data is now locked.",
			});
			// Refresh data untuk mendapatkan status terbaru
			fetchMyRegistrations();
		} catch (error: any) {
			toast.error("Failed to submit for review", {
				description: error.message || "An unexpected error occurred.",
			});
		}
	};

	// Definisikan status yang dapat diedit secara eksplisit
	const editableStatuses: string[] = [
		REGISTRATION_STATUS.PENDING,
		REGISTRATION_STATUS.REJECTED,
	];

	return (
		<div className="space-y-6">
			<PageHeader
				title="Upload Berkas Wajib"
				description="Unggah dokumen wajib untuk kelengkapan tim Anda. Setelah kedua dokumen diunggah, data akan dikunci."
			/>

			<div className="space-y-4">
				{!editableStatuses.includes(status) && (
					<Alert className="border-secondary text-secondary">
						<Info className="h-4 w-4 !text-secondary" />
						<AlertDescription>
							Pendaftaran Anda sedang dalam tahap peninjauan. Perubahan pada
							biodata dan dokumen tidak dapat dilakukan.
						</AlertDescription>
					</Alert>
				)}
				<div className="grid gap-6 lg:grid-cols-2">
					<DocumentUploadCard
						title="Formulir Tim"
						description="Unggah formulir pendaftaran tim yang telah diisi."
						documentType={DOCUMENT_TYPE.VALIDATION}
						uploadedDocuments={documents}
						registrationStatus={status}
					/>
					<DocumentUploadCard
						title="Berkas Mitra Cloudkilat"
						description="Unggah bukti pendaftaran atau penggunaan layanan dari Cloudkilat."
						documentType={DOCUMENT_TYPE.SPONSOR}
						uploadedDocuments={documents}
						registrationStatus={status}
					/>
				</div>
			</div>
		</div>
	);
}
