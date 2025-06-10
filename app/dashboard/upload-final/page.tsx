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
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { EmptyState } from "@/components/common/EmptyState";
import { Trophy } from "lucide-react";

export default function UploadFinalPage() {
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
			const isFinalist =
				currentRegistration.status === REGISTRATION_STATUS.FINAL;
			if (!isUIUX || !isFinalist) {
				router.push("/dashboard");
			}
		}
	}, [loading, currentRegistration, router]);

	if (loading || !currentRegistration) {
		return <PageLoader message="Verifying finalist status..." />;
	}

	const isUIUX = currentRegistration.competition.name
		.toLowerCase()
		.includes(COMPETITION_KEYS.UI_UX);
	const isFinalist = currentRegistration.status === REGISTRATION_STATUS.FINAL;

	if (!isUIUX || !isFinalist) {
		return (
			<div className="space-y-8">
				<PageHeader title="Akses Ditolak" />
				<Card>
					<CardContent className="pt-6">
						<EmptyState
							icon={Trophy}
							title="Not a Finalist"
							description="Halaman ini hanya dapat diakses oleh finalis kompetisi UI/UX."
						/>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<PageHeader
				title="Upload Berkas Final"
				description="Selamat! Anda adalah finalis. Silakan unggah berkas final Anda di sini."
			/>
			<div className="max-w-2xl mx-auto">
				<DocumentUploadCard
					title="Submission Final"
					description="Unggah deck presentasi dan prototipe final Anda."
					documentType={DOCUMENT_TYPE.FINAL}
					uploadedDocuments={currentRegistration.documents}
				/>
			</div>
		</div>
	);
}
