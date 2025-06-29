// app/(competitions)/line-follower/page.tsx
import {
	CompetitionPageLayout,
	CompetitionPageData,
} from "@/components/layout/CompetitionPageLayout";

const ftlData: CompetitionPageData = {
	id: 3,
	key: "FTL",
	title: "Line Follower",
	theme:
		"Line Follower Competition hosted by the Computer Engineering Department of Diponegoro University with theme “Algorithmic Edge: Precision in Motion, Unrivaled Victory.”",
	cardImage: "https://storage.theaceundip.id/assets/linefollower-stacked.webp",
	guidebookLink:
		"https://drive.google.com/file/d/10Hld8d8AtEcSJlCqAX53QJiykfN1FrVn/view?usp=drive_link",
	countdownTarget: new Date("2025-08-25T23:59:59"), // End of registration
	terms: [
		"Kompetisi terbuka untuk Pelajar (SMA/SMK/sederajat) dan Mahasiswa (D3/D4/S1).",
		"Setiap tim terdiri dari maksimal 2 orang.",
		"Anggota tim tidak harus berasal dari instansi yang sama.",
		"Setiap tim hanya dapat mendaftarkan satu robot.",
		"Robot harus bersifat autonomus dan merupakan buatan sendiri (bukan kit pabrikan).",
		"Spesifikasi dimensi robot maksimal 20x20x10 cm dengan voltase baterai tidak lebih dari 13 volt.",
	],
	prizes: [
		"Juara 1: Trophy, Sertifikat, Uang Pembinaan",
		"Juara 2: Trophy, Sertifikat, Uang Pembinaan",
		"Juara 3: Trophy, Sertifikat, Uang Pembinaan",
		"Semua Peserta akan mendapatkan Sertifikat.",
	],
	timeline: [
		{ name: "Pendaftaran", date: "10 Juni – 25 Agustus 2025" },
		{ name: "Technical Meeting (Online)", date: "31 Agustus 2025" },
		{ name: "Pelaksanaan Lomba (Offline)", date: "6 September 2025" },
		{ name: "Pengumuman Pemenang", date: "6 September 2025" },
	],
	faqs: [
		{
			question: "Apakah komponen robot disediakan oleh panitia?",
			answer:
				"Tidak. Peserta bertanggung jawab untuk merancang, membangun, dan membawa robot mereka sendiri sesuai dengan spesifikasi yang telah ditentukan dalam guidebook.",
		},
		{
			question: "Bagaimana format pertandingan?",
			answer:
				"Pertandingan akan menggunakan sistem waktu tercepat. Robot akan melewati serangkaian babak (32 besar, 16 besar, 8 besar, dan final) berdasarkan catatan waktu terbaik.",
		},
		{
			question: "Di mana lokasi perlombaan akan diadakan?",
			answer:
				"Lomba akan diadakan secara offline di Ruang A201 dan A202 Gedung Teknik Komputer, Universitas Diponegoro.",
		},
	],
};

export default function LineFollowerPage() {
	return <CompetitionPageLayout data={ftlData} />;
}
