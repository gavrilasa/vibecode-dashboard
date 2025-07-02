// app/(competitions)/ctf/page.tsx
import {
	CompetitionPageLayout,
	CompetitionPageData,
} from "@/components/layout/CompetitionPageLayout";

const ctfData: CompetitionPageData = {
	id: 1,
	key: "CTF",
	title: "Capture The Flag",
	theme:
		"The Capture The Flag Competition hosted by the Computer Engineering Department of Diponegoro University with theme “Cyber Sentinel 2025: Break the Code, Secure the Future.”",
	cardImage: "https://storage.theaceundip.id/assets/ctf-stacked.webp",
	guidebookLink:
		"https://drive.google.com/file/d/12bHX-j6ThqhkHdQcX5LyJWN4X0hlzzWr/view?usp=drive_link",
	contactPerson:
		"https://wa.me/6281331437810?text=Hai%20Mas%20Azzam%2C%20Saya%20Calon%20Peserta%20CTF%20The%20Ace%202025%20ingin%20bertanya%20mengenai%20beberapa%20hal",
	countdownTarget: new Date("2025-07-10T23:59:59"),
	terms: [
		"Peserta merupakan siswa (SMA/SMK) atau mahasiswa (D3/D4/S1) aktif.",
		"Satu tim terdiri dari 3 anggota dari institusi yang sama.",
		"Babak penyisihan akan diselenggarakan secara daring (online).",
		"Finalis yang lolos wajib mengikuti babak final secara luring (offline).",
		"Peserta dilarang berbagi flag, melakukan serangan DDoS, atau bentuk kecurangan lainnya.",
		"Keputusan panitia dan juri bersifat mutlak.",
		"Untuk detail lebih lengkap mengenai syarat dan ketentuan dapat dilihat pada Guidebook",
	],
	prizes: [
		"Juara 1: Trophy, Sertifikat, Uang Pembinaan",
		"Juara 2: Trophy, Sertifikat, Uang Pembinaan",
		"Juara 3: Trophy, Sertifikat, Uang Pembinaan",
		"Semua Peserta akan mendapatkan Sertifikat.",
	],
	timeline: [
		{ name: "Pendaftaran Gelombang 1", date: "10 – 19 Juni 2025" },
		{ name: "Pendaftaran Gelombang 2", date: "20 – 29 Juni 2025" },
		{ name: "Pendaftaran Gelombang 3", date: "30 Juni – 10 Juli 2025" },
		{ name: "Technical Meeting Penyisihan (Online)", date: "16 Juli 2025" },
		{ name: "Warm Up", date: "18 Juli 2025" },
		{ name: "Babak Penyisihan", date: "19 Juli 2025" },
		{ name: "Pengumpulan Write Up", date: "19 Juli 2025" },
		{ name: "Pengumuman Finalis", date: "22 Juli 2025" },
		{ name: "Technical Meeting Finalis", date: "30 Agustus 2025" },
		{ name: "Pelaksanaan Final (Offline)", date: "6 September 2025" },
		{ name: "Pengumuman Pemenang", date: "6 September 2025" },
	],
	faqs: [
		{
			question: "Siapa saja yang dapat mengikuti lomba Capture The Flag (CTF)?",
			answer:
				"Kompetisi ini terbuka untuk siswa/i SMA/SMK/sederajat (SLTA) dan mahasiswa aktif dari seluruh perguruan tinggi di Indonesia.",
		},
		{
			question: "Berapa jumlah anggota yang diperbolehkan dalam satu tim?",
			answer:
				"Satu tim maksimal terdiri dari 3 anggota yang berasal dari institusi yang sama.",
		},
		{
			question: "Apa saja kategori soal yang akan dilombakan?",
			answer:
				"Kategori soal meliputi Kriptografi, Binary Exploitation, Forensik Digital, Reverse Engineering, dan Web Exploitation.",
		},
		{
			question: "Bagaimana format babak penyisihan CTF?",
			answer:
				"Babak penyisihan menggunakan format kompetisi 'Jeopardy Style' dan akan diselenggarakan secara online.",
		},
		{
			question: "Bagaimana format babak final CTF?",
			answer:
				"Babak final akan diadakan secara offline dengan format gabungan, yaitu 'Jeopardy' untuk 10 tim teratas dan dilanjutkan dengan 'Face Off (1v1)' untuk 4 tim terbaik.",
		},
	],
};

export default function CTFPage() {
	return <CompetitionPageLayout data={ctfData} />;
}
