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
		"https://drive.google.com/file/d/1kAy5RIuUiRTJBpmxvhvooePZkWDePpWD/view?usp=drive_link",
	countdownTarget: new Date("2025-07-10T23:59:59"), // End of registration wave 3
	terms: [
		"Peserta merupakan siswa (SMA/SMK) atau mahasiswa (D3/D4/S1) aktif.",
		"Satu tim terdiri dari 3 anggota dari institusi yang sama.",
		"Babak penyisihan akan diselenggarakan secara daring (online).",
		"Finalis yang lolos wajib mengikuti babak final secara luring (offline).",
		"Peserta dilarang berbagi flag, melakukan serangan DDoS, atau bentuk kecurangan lainnya.",
		"Keputusan panitia dan juri bersifat mutlak.",
	],
	prizes: [
		"Juara 1: Trophy, Sertifikat, Uang Pembinaan",
		"Juara 2: Trophy, Sertifikat, Uang Pembinaan",
		"Juara 3: Trophy, Sertifikat, Uang Pembinaan",
		"Best WriteUp: Sertifikat, Uang Pembinaan",
		"Semua Finalis dan Peserta akan mendapatkan Sertifikat.",
	],
	timeline: [
		{ name: "Pendaftaran Gelombang 1", date: "10 – 19 Juni 2025" },
		{ name: "Pendaftaran Gelombang 2", date: "20 – 29 Juni 2025" },
		{ name: "Pendaftaran Gelombang 3", date: "30 Juni – 10 Juli 2025" },
		{ name: "Technical Meeting Penyisihan", date: "14 Juli 2025" },
		{ name: "Warm Up", date: "16 Juli 2025" },
		{ name: "Babak Penyisihan", date: "17 Juli 2025" },
		{ name: "Pengumuman Finalis", date: "24 Juli 2025" },
		{ name: "Technical Meeting Finalis", date: "1 September 2025" },
		{ name: "Pelaksanaan Final (Offline)", date: "6 September 2025" },
	],
	faqs: [
		{
			question: "Apa saja kategori soal dalam CTF ini?",
			answer:
				"Kategori soal yang akan dilombakan meliputi Kriptografi, Binary Exploitation, Forensik Digital, Reverse Engineering, dan Web Exploitation.",
		},
		{
			question: "Bagaimana format kompetisinya?",
			answer:
				"Kompetisi menggunakan format Jeopardy Style. Babak penyisihan diadakan secara online, sedangkan babak final akan diadakan secara offline.",
		},
		{
			question: "Berapa jumlah anggota dalam satu tim?",
			answer:
				"Satu tim wajib terdiri dari 3 anggota yang berasal dari institusi (SMA/Perguruan Tinggi) yang sama.",
		},
	],
};

export default function CTFPage() {
	return <CompetitionPageLayout data={ctfData} />;
}
