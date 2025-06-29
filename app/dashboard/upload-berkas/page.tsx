// app/dashboard/upload-berkas/page.tsx

"use client";

import { useEffect } from "react";
import { useRegistration } from "@/hooks/useRegistration";
import { useAuth } from "@/hooks/useAuth";
import { PageLoader } from "@/components/common/PageLoader";
import { PageHeader } from "@/components/common/PageHeader";
import { DocumentUploadCard } from "@/components/features/upload/DocumentUploadCard";
import {
	DOCUMENT_TYPE,
	REGISTRATION_STATUS,
	COMPETITION_KEYS,
} from "@/lib/constants";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const competitionLinks = {
	[COMPETITION_KEYS.CTF]: {
		twibbonLink:
			"https://drive.google.com/file/d/1GoEeHFV67K-DQW0_Z3-uA0Uv2JufjxB1/view?usp=drive_link",
	},
	[COMPETITION_KEYS.UI_UX]: {
		twibbonLink:
			"https://drive.google.com/file/d/1YcRVR9_oZWtSS0UlLPOzWGc3RY6ymw3R/view?usp=drive_link",
	},
	[COMPETITION_KEYS.FTL]: {
		twibbonLink:
			"https://drive.google.com/file/d/1mQql6RlK1tsnVf3A-ZyeLPyf5u61PfZ-/view?usp=drive_link",
	},
	default: {
		twibbonLink: "#",
	},
};

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
	const {
		documents,
		status,
		id: registrationId,
		competition,
	} = currentRegistration;

	const competitionName = competition.name.toLowerCase();
	let competitionKey: keyof typeof competitionLinks = "default";

	if (competitionName.includes(COMPETITION_KEYS.CTF)) {
		competitionKey = COMPETITION_KEYS.CTF;
	} else if (competitionName.includes(COMPETITION_KEYS.UI_UX)) {
		competitionKey = COMPETITION_KEYS.UI_UX;
	} else if (competitionName.includes(COMPETITION_KEYS.FTL)) {
		competitionKey = COMPETITION_KEYS.FTL;
	}

	const links = competitionLinks[competitionKey];

	const editableStatuses: string[] = [
		REGISTRATION_STATUS.PENDING,
		REGISTRATION_STATUS.REJECTED,
	];

	return (
		<div className="space-y-6">
			<PageHeader
				title="Upload Berkas Wajib"
				description="Unggah dokumen wajib untuk kelengkapan tim Anda. Setelah semua dokumen diunggah, data akan dikunci."
			/>

			{!editableStatuses.includes(status) && (
				<Alert className="border-secondary text-secondary">
					<Info className="h-4 w-4 !text-secondary" />
					<AlertDescription>
						Pendaftaran Anda sedang dalam tahap peninjauan. Perubahan pada
						biodata dan dokumen tidak dapat dilakukan.
					</AlertDescription>
				</Alert>
			)}

			<div className="space-y-8">
				<div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-2">
					<div>
						<Card>
							<CardHeader className="pb-3">
								<CardTitle>Syarat: Formulir Pendaftaran Tim</CardTitle>
								<CardDescription>
									Peserta mengumpulkan formulir pendaftaran yang berupa (Format
									Formulir dapat diunduh melalui{" "}
									<a
										href="https://docs.google.com/document/d/1IOMDFdHpkfnH6D4leDKQB-U5TOl6BRgb/edit?usp=drive_link&ouid=101549707681531278662&rtpof=true&sd=true"
										target="_blank"
										rel="noopener noreferrer"
										className="underline text-primary"
									>
										link berikut
									</a>
									) :
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2 text-sm">
								<ul className="ml-4 space-y-1 list-disc list-outside">
									<li>
										Bukti tiap peserta sebagai siswa/mahasiswa aktif, dapat
										berupa kartu pelajar, KTM, atau surat pengantar/keterangan
										dari sekolah/perguruan tinggi.
									</li>
									<li>
										Bukti tiap peserta upload poster di story Instagram yang
										disimpan dalam 1 folder.
									</li>
									<li>
										Bukti tiap peserta upload twibbon pendaftaran di feeds
										Instagram (Twibbon dan caption dapat diunduh melalui{" "}
										<a
											href={links.twibbonLink}
											target="_blank"
											rel="noopener noreferrer"
											className="underline text-primary"
										>
											link berikut
										</a>
										).
									</li>
									<li>
										Bukti pembayaran yang memuat:
										<ul className="list-['-_'] list-outside ml-4">
											<li>Asal Bank</li>
											<li>Jumlah sesuai</li>
											<li>Isi catatan dengan nama Tim</li>
											<li>
												Dilarang Top up melalui Pihak ketiga (Kecuali disertai
												keterangan nama anggota/tim)
											</li>
										</ul>
									</li>
									<li>
										Screenshot bukti telah mengikuti akun media berikut:
										Instagram{" "}
										<a
											href="https://www.instagram.com/theace.2025/"
											target="_blank"
											rel="noopener noreferrer"
											className="underline text-primary"
										>
											@theace.2025
										</a>
									</li>
									<li>
										Semua bukti berkas pendaftaran tim disatukan dalam satu file
										berbentuk pdf.
									</li>
									<li>Format nama file sebagai berikut: </li>
									<p>
										<span className="font-mono break-words">
											{" "}
											⁠TheAce_[Lomba]_[NamaTim].pdf
										</span>
									</p>
								</ul>
							</CardContent>
						</Card>
					</div>
					<div>
						<DocumentUploadCard
							title="Formulir Pendaftaran Tim"
							description="Unggah formulir pendaftaran tim yang telah diisi."
							documentType={DOCUMENT_TYPE.VALIDATION}
							uploadedDocuments={documents}
							registrationStatus={status}
						/>
					</div>
				</div>

				{/* Bagian Berkas Mitra */}
				<div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-2">
					<div>
						<Card>
							<CardHeader className="pb-3">
								<CardTitle>Syarat: Berkas Mitra Cloudkilat</CardTitle>
								<CardDescription>
									Peserta mengumpulkan bukti klaim voucher domain dari mitra The
									Ace (Format lampiran dapat diunduh melalui{" "}
									<a
										href="https://docs.google.com/document/d/1rVAALGqG3dz4x6nScO7iMw3HP3vA02Rd/edit?usp=drive_link&ouid=101549707681531278662&rtpof=true&sd=true"
										target="_blank"
										rel="noopener noreferrer"
										className="underline text-primary"
									>
										link berikut
									</a>
									):
								</CardDescription>
							</CardHeader>
							<CardContent className="text-sm">
								<ul className="ml-4 space-y-1 list-disc list-outside">
									<li>Screenshot bukti telah claim voucher domain (.my.id)</li>
									<li>
										Kode voucher domain:{" "}
										<span className="font-mono">THEACE2025</span>
									</li>
									<li>
										Tutorial klaim via{" "}
										<a
											href="https://drive.google.com/file/d/1fa1AowT5N3a56J5bZ0zobEGliWool0ez/view?usp=drive_link"
											target="_blank"
											rel="noopener noreferrer"
											className="underline text-primary"
										>
											Video disini
										</a>
									</li>
									<li>
										Tutorial klaim via{" "}
										<a
											href="https://kb.cloudkilat.id/pemesanan-layanan-domain/cara-memesan-domain-di-portal-cloudkilat"
											target="_blank"
											rel="noopener noreferrer"
											className="underline text-primary"
										>
											Artikel disini
										</a>
									</li>
									<li>
										Screenshot bukti telah mengikuti akun media berikut:
										<ul className="list-['-_'] list-outside ml-4">
											<li>
												IG:{" "}
												<a
													href="https://www.instagram.com/cloudkilat/"
													target="_blank"
													rel="noopener noreferrer"
													className="underline text-primary"
												>
													@cloudkilat
												</a>
											</li>
											<li>
												TikTok:{" "}
												<a
													href="https://www.tiktok.com/@cloudkilat"
													target="_blank"
													rel="noopener noreferrer"
													className="underline text-primary"
												>
													@cloudkilat
												</a>
											</li>
										</ul>
									</li>
									<li>
										Semua bukti berkas mitra disatukan dalam satu file berbentuk
										pdf.
									</li>
									<li>Format nama file sebagai berikut: </li>
									<p>
										<span className="font-mono break-words">
											⁠TheAce_[NamaTim]_Mitra_CloudKilat.pdf
										</span>
									</p>
								</ul>
							</CardContent>
						</Card>
					</div>
					<div>
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
		</div>
	);
}
