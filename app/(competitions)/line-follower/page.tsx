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
		"https://drive.google.com/file/d/1Buqhh-YwtDABUKwik1VaPjY6BaAiLjaO/view?usp=drive_link",
	contactPerson:
		"https://wa.me/6281331437810?text=Hai%20Mas%20Cielo%2C%20Saya%20Calon%20Peserta%20Line%20Follower%20The%20Ace%202025%20ingin%20bertanya%20mengenai%20beberapa%20hal",
	countdownTarget: new Date("2025-08-25T23:59:59"),
	terms: [
		"Kompetisi terbuka untuk Umum.",
		"Setiap tim terdiri dari maksimal 2 orang.",
		"Anggota tim tidak harus berasal dari instansi yang sama.",
		"Setiap tim hanya dapat mendaftarkan satu robot.",
		"Setiap tim diperbolehkan menggunakan kit development seperti: ichibot, kakarobot, dan sebagainya.",
		"Spesifikasi dimensi robot maksimal 20x20x12 cm dengan voltase baterai tidak lebih dari 13 volt.",
		"Untuk detail lebih lengkap mengenai syarat dan ketentuan dapat dilihat pada Guidebook",
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
			question: "Siapa saja yang dapat mengikuti lomba Line Follower?",
			answer:
				"Lomba Line Follower terbuka untuk semua kalangan, termasuk siswa/i SLTA, mahasiswa, dan umum, tanpa ada batasan institusi.",
		},
		{
			question: "Apakah komponen robot disediakan oleh panitia?",
			answer:
				"Tidak. Peserta bertanggung jawab untuk merancang, membangun, dan membawa robot mereka sendiri sesuai dengan spesifikasi yang telah ditentukan dalam guidebook.",
		},
		{
			question: "Apakah peserta boleh menggunakan kit pabrikan?",
			answer:
				"Peserta dilarang menggunakan kit pabrikan seperti: Lego, pololu, dan sebagainya. Tetapi diperbolehkan menggunakan development kit seperti: ichibot, kakarobot, dan sebagainya. Parts pihak ke-3 juga diperbolehkan",
		},
		{
			question: "Bagaimana format pertandingan?",
			answer:
				"Pertandingan akan menggunakan sistem waktu tercepat. Robot akan melewati serangkaian babak (32 besar, 16 besar, 8 besar, dan final) berdasarkan catatan waktu terbaik.",
		},
		{
			question: "Apakah peserta dapat mendapatkan akses untuk sirkuit?",
			answer: "Sirkuit dapat diakses melalui guidebook yang tertera ",
		},
		{
			question: "⁠Apakah akan ada obstacle pada Sirkuit?",
			answer:
				"Panitia telah menyiapkan beberapa obstacle, untuk lebih detail bisa diakses di guidebook",
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
