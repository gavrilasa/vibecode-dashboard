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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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

	const isUploadAllowed = canUploadPenyisihan(currentRegistration);

	return (
		<div className="space-y-6">
			<PageHeader
				title="Unggah Berkas Penyisihan"
				description="Halaman ini khusus untuk pengumpulan berkas tahap penyisihan kompetisi UI/UX."
			/>

			<div className="space-y-8">
				<div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-2">
					<div>
						<Card>
							<CardHeader className="pb-3">
								<CardTitle>Ketentuan Lomba: Babak Kualifikasi</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2 text-sm">
								<ul className="ml-4 space-y-2 leading-relaxed list-disc list-outside">
									<li>
										Setiap peserta hanya diperbolehkan mengambil satu platform
										(mobile) untuk dijadikan sebagai studi kasus.
									</li>
									<li>
										Karya tidak boleh mengandung unsur pornografi, SARA, sadisme
										atau hal-hal yang bersifat merendahkan atau melecehkan pihak
										lain
									</li>
									<li>
										Karya yang diusulkan merupakan karya orisinil peserta dan
										belum pernah diikutsertakan dalam kompetisi sejenis serta
										belum pernah dipublikasikan dalam bentuk apapun. Jika karya
										tersebut terbukti pernah memenangkan lomba, maka panitia
										berhak mendiskualifikasi submisi aplikasi tersebut.
									</li>
									<li>
										Karya harus sesuai dengan tema yaitu{" "}
										<span className="font-medium ">
											“Impactful Digital Innovation: Designing Valuable and
											Sustainable Solutions.”
										</span>{" "}
										dan memilih 1 (atau lebih) dari 5 subtema yang diberikan.
									</li>
									<li>
										Karya yang diterima adalah karya yang dikirimkan sesuai
										dengan batas waktu yang telah ditentukan.
									</li>
									<li>
										Penilaian dilakukan oleh dewan juri yang telah ditetapkan
										oleh panitia.
									</li>
									<li>
										Dewan Juri adalah pihak yang memiliki wewenang memberikan
										penilaian sesuai dengan kriteria yang telah ditetapkan.
									</li>
									<li>
										Penilaian dari dewan juri bersifat mutlak dan tidak dapat
										diganggu gugat.
									</li>
									<li>
										Pemenang perlombaan merupakan tim dengan nilai tertinggi
										dari semua aspek penilaian yang telah ditetapkan oleh
										panitia.
									</li>
									<li>
										Karya yang diajukan harus memiliki potensi nilai bisnis,
										seperti peluang monetisasi, keberlanjutan produk, atau
										peluang pengembangan ke pasar yang lebih luas.
									</li>
									<li>
										Pengumpulan dokumen dalam bentuk PDF (yang memuat lampiran
										lain seperti surat orisinalitas karya, dan link demo).
									</li>
								</ul>
							</CardContent>
						</Card>
					</div>
					<div className="">
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
			</div>
		</div>
	);
}
