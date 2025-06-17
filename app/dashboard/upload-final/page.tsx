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
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
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

			<div className="space-y-8">
				<div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-2">
					<div>
						<Card>
							<CardHeader className="pb-3">
								<CardTitle>Ketentuan Lomba: Babak Final</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2 text-sm">
								<ul className="ml-4 space-y-2 leading-relaxed list-disc list-outside">
									<li>
										Babak final dilakukan secara{" "}
										<span className="font-bold">daring</span>.
									</li>
									<li>
										Finalis <span className="font-bold">wajib</span> mengikuti
										Technical Meeting secara daring.
									</li>
									<li>
										Finalis <span className="font-bold">wajib</span>{" "}
										mengumpulkan video trailer dari aplikasi yang telah dibuat
										dengan durasi maksimal 5 menit
									</li>
									<li>
										Video <span className="italic">trailer</span> dikumpulkan
										dalam bentuk link Google Drive atau YouTube.
									</li>
									<li>
										Peserta <span className="font-bold">wajib</span>{" "}
										mempresentasikan karya dengan membuat powerpoint yang
										berisikan :
										<ul className="list-['-_'] list-outside ml-4 space-y-1">
											<li>Judul, Nama Tim, Nama Anggota.</li>
											<li>Latar Belakang</li>
											<li>Solusi</li>
											<li>Tujuan dan Manfaat</li>
											<li>Strategi Bisnis & Target Aplikasi</li>
											<li>
												Simulasi penggunaan aplikasi berbasis mobile
												(melampirkan link Figma pada slide Powerpoint).
											</li>
										</ul>
									</li>
									<li>
										Peserta melakukan demo aplikasi setelah presentasi singkat.
									</li>
									<li>Peserta melakukan presentasi dengan durasi 10 menit</li>
									<li>Tanya jawab dilakukan selama 20 menit.</li>
								</ul>
							</CardContent>
						</Card>
					</div>
					<div className="">
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
			</div>
		</div>
	);
}
