// File: components/features/dashboard/WhatToDoCard.tsx

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	REGISTRATION_STATUS,
	APP_ROUTES,
	COMPETITION_KEYS,
} from "@/lib/constants";
import {
	Clock,
	Info,
	CheckCircle,
	XCircle,
	FileText,
	Trophy,
	Lightbulb,
} from "lucide-react";

interface WhatToDoCardProps {
	status: (typeof REGISTRATION_STATUS)[keyof typeof REGISTRATION_STATUS];
	competitionName: string; // Tambahkan prop ini
}

export function WhatToDoCard({ status, competitionName }: WhatToDoCardProps) {
	const isUiUxCompetition = competitionName
		.toLowerCase()
		.includes(COMPETITION_KEYS.UI_UX);

	const renderContent = () => {
		switch (status) {
			case REGISTRATION_STATUS.PENDING:
				return (
					<Alert className="text-yellow-700 border-yellow-500/50 dark:text-yellow-400 bg-yellow-50/50 dark:bg-yellow-900/10">
						<Clock className="h-4 w-4 !text-yellow-600" />
						<AlertTitle>Lengkapi Berkas Pendaftaran</AlertTitle>
						<AlertDescription className="space-y-4">
							<p>
								Pendaftaran awal Anda berhasil! Langkah selanjutnya adalah
								melengkapi semua berkas wajib untuk verifikasi. Pastikan semua
								dokumen yang diunggah sudah benar dan sesuai format.
							</p>
							<Button asChild className="text-white">
								<Link href={APP_ROUTES.UPLOAD_BERKAS}>Lengkapi Berkas</Link>
							</Button>
						</AlertDescription>
					</Alert>
				);

			case REGISTRATION_STATUS.REVIEW:
				return (
					<Alert>
						<Info className="w-4 h-4" />
						<AlertTitle>Berkas Sedang Ditinjau</AlertTitle>
						<AlertDescription>
							Terima kasih! Berkas Anda telah kami terima dan sedang dalam
							proses peninjauan oleh panitia. Anda tidak dapat mengubah data
							selama proses ini. Pengumuman verifikasi akan diinformasikan lebih
							lanjut.
						</AlertDescription>
					</Alert>
				);

			case REGISTRATION_STATUS.APPROVED:
				return (
					<Alert className="text-green-700 border-green-500/50 dark:text-green-400 bg-green-50/50 dark:bg-green-900/10">
						<CheckCircle className="h-4 w-4 !text-green-600" />
						<AlertTitle>Pendaftaran Terverifikasi!</AlertTitle>
						<AlertDescription>
							Selamat, tim Anda telah berhasil diverifikasi dan resmi menjadi
							peserta The ACE 2025. Silakan pantau timeline untuk tahapan
							kompetisi selanjutnya.
						</AlertDescription>
					</Alert>
				);

			case REGISTRATION_STATUS.REJECTED:
				return (
					<Alert variant="destructive">
						<XCircle className="w-4 h-4" />
						<AlertTitle>Pendaftaran Ditolak</AlertTitle>
						<AlertDescription className="space-y-4">
							<p>
								Mohon maaf, pendaftaran Anda belum dapat disetujui. Silakan
								perbarui kelengkapan berkas Anda. Panitia akan segera
								menghubungi ketua tim untuk detail lebih lanjut.
							</p>
							<Button asChild variant="destructive" className="text-white">
								<Link href={APP_ROUTES.UPLOAD_BERKAS}>Perbarui Berkas</Link>
							</Button>
						</AlertDescription>
					</Alert>
				);

			case REGISTRATION_STATUS.PRELIMINARY:
				return (
					<Alert className="text-blue-700 border-blue-500/50 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10">
						<FileText className="h-4 w-4 !text-blue-600" />
						<AlertTitle>Babak Penyisihan</AlertTitle>
						<AlertDescription className="space-y-4">
							{isUiUxCompetition ? (
								<>
									<p>
										Anda telah memasuki babak penyisihan. Segera kumpulkan hasil
										karya Anda sebelum batas waktu yang telah ditentukan.
									</p>
									<Button
										asChild
										className="text-white bg-blue-700 hover:bg-blue-700/80"
									>
										<Link href={APP_ROUTES.UPLOAD_PENYISIHAN}>
											Upload Karya
										</Link>
									</Button>
								</>
							) : (
								<p>
									Anda telah memasuki babak penyisihan. Persiapkan diri Anda
									untuk menghadapi tantangan selanjutnya sesuai jadwal pada
									timeline.
								</p>
							)}
						</AlertDescription>
					</Alert>
				);

			case REGISTRATION_STATUS.FINAL:
				return (
					<Alert className="text-purple-700 border-purple-500/50 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-900/10">
						<Trophy className="h-4 w-4 !text-purple-600" />
						<AlertTitle>Selamat, Anda Finalis!</AlertTitle>
						<AlertDescription className="space-y-4">
							{isUiUxCompetition ? (
								<>
									<p>
										Luar biasa! Tim Anda berhasil lolos ke babak final.
										Persiapkan diri Anda dan unggah berkas final sesuai dengan
										ketentuan yang berlaku.
									</p>
									<Button
										asChild
										className="text-white bg-purple-700 hover:bg-purple-700/80"
									>
										<Link href={APP_ROUTES.UPLOAD_FINAL}>
											Upload Berkas Final
										</Link>
									</Button>
								</>
							) : (
								<p>
									Luar biasa! Tim Anda berhasil lolos ke babak final. Persiapkan
									strategi terbaik Anda untuk perebutan juara. Perhatikan jadwal
									Technical Meeting pada timeline.
								</p>
							)}
						</AlertDescription>
					</Alert>
				);

			case REGISTRATION_STATUS.ELIMINATED:
				return (
					<Alert>
						<Info className="w-4 h-4" />
						<AlertTitle>Terima Kasih Atas Partisipasinya</AlertTitle>
						<AlertDescription>
							Perjuangan tim Anda di kompetisi ini telah berakhir. Kami sangat
							menghargai usaha dan waktu yang telah Anda berikan. Jangan
							berkecil hati dan sampai jumpa di The ACE selanjutnya!
						</AlertDescription>
					</Alert>
				);

			default:
				return <p>Status tidak diketahui.</p>;
		}
	};

	return (
		<Card>
			<CardHeader className="pb-3 space-y-2">
				<CardTitle className="flex items-center space-x-2">
					<Lightbulb className="w-5 h-5 text-primary" />
					<span>Langkah Selanjutnya</span>
				</CardTitle>
				<CardDescription>
					Status pendaftaran Anda dan tindakan yang diperlukan.
				</CardDescription>
			</CardHeader>
			<CardContent>{renderContent()}</CardContent>
		</Card>
	);
}
