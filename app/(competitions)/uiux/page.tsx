// app/(competitions)/uiux/page.tsx
import {
	CompetitionPageLayout,
	CompetitionPageData,
} from "@/components/layout/CompetitionPageLayout";

const uiuxData: CompetitionPageData = {
	id: 2,
	key: "UI_UX",
	title: "UI/UX Design",
	theme:
		"The UI/UX Competition hosted by the Computer Engineering Department of Diponegoro University with theme “Impactful Digital Innovation: Designing Valuable and Sustainable Solutions.”",
	cardImage: "https://storage.theaceundip.id/assets/uiux-stacked.webp",
	guidebookLink:
		"https://drive.google.com/file/d/1Lw0ZEv1GTMq_p9I5PNHn_7Pl-F_IDUxm/view?usp=sharing",
	contactPerson:
		"https://wa.me/6281331437810?text=Hai%20Mas%20Rakha%2C%20Saya%20Calon%20Peserta%20UI/UX%20Design%20The%20Ace%202025%20ingin%20bertanya%20mengenai%20beberapa%20hal",
	countdownTarget: new Date("2025-07-17T23:59:59"),
	terms: [
		"Peserta merupakan mahasiswa/i aktif (D1-S1) atau siswa/i (SMA/SMK).",
		"Satu tim terdiri dari 2-3 anggota dari institusi yang sama.",
		"Setiap peserta hanya boleh terdaftar dalam satu tim di kompetisi UI/UX.",
		"Karya yang diusulkan harus orisinil dan belum pernah diikutsertakan dalam kompetisi lain.",
		"Desain harus sesuai dengan tema utama dan memilih minimal satu dari subtema SDGs yang ditentukan.",
		"Segala bentuk kecurangan atau plagiarisme akan mengakibatkan diskualifikasi.",
		"Untuk detail lebih lengkap mengenai syarat dan ketentuan dapat dilihat pada Guidebook",
	],
	prizes: [
		"Juara 1: Trophy, Sertifikat, Uang Pembinaan",
		"Juara 2: Trophy, Sertifikat, Uang Pembinaan",
		"Juara 3: Trophy, Sertifikat, Uang Pembinaan",
		"Semua Peserta akan mendapatkan E-Sertifikat.",
	],
	timeline: [
		{ name: "Pendaftaran Gelombang 1", date: "10 – 19 Juni 2025" },
		{ name: "Pendaftaran Gelombang 2", date: "20 – 29 Juni 2025" },
		{ name: "Pendaftaran Gelombang 3", date: "30 Juni – 10 Juli 2025" },
		{ name: "Pendaftaran Extend", date: "11 Juli – 17 Juli 2025" },
		{ name: "Pengumpulan Karya", date: "11 Juli – 2 Agustus 2025" },
		{ name: "Pengumuman Finalis", date: "19 Agustus 2025" },
		{ name: "Technical Meeting Finalis", date: "24 Agustus 2025" },
		{ name: "Pelaksanaan Final", date: "31 Agustus 2025" },
		{ name: "Pengumuman Pemenang", date: "31 Agustus 2025" },
	],
	faqs: [
		{
			question: "Siapa saja yang dapat mengikuti lomba UI/UX Design?",
			answer:
				"Kompetisi ini terbuka untuk siswa/i SMA/SMK/sederajat (SLTA) dan mahasiswa aktif dari seluruh perguruan tinggi di Indonesia.",
		},
		{
			question: "Berapa jumlah anggota yang diperbolehkan dalam satu tim?",
			answer:
				"Satu tim wajib terdiri dari 3 anggota yang berasal dari institusi yang sama.",
		},
		{
			question: "Apakah ada batasan halaman untuk proposal desain?",
			answer:
				"Tidak ada batasan jumlah halaman pada proposal. Namun, pastikan semua bab, sub-bab, dan lampiran yang disyaratkan dalam template telah dilengkapi.",
		},
		{
			question: "Bolehkah tim menambahkan sub-bab sendiri pada proposal?",
			answer:
				"Tentu, peserta diperbolehkan menambahkan sub-bab sesuai kebutuhan, selama tidak mengurangi atau mengubah struktur utama yang telah ditentukan pada template.",
		},
		{
			question: "Apakah boleh menggunakan ikon dari plugin Figma?",
			answer:
				"Ya, peserta diperbolehkan untuk menggunakan ikon yang berasal dari plugin Figma.",
		},
		{
			question: "Bagaimana aturan penggunaan ilustrasi dari platform online?",
			answer:
				"Peserta boleh menggunakan ilustrasi dari platform lain, namun wajib memodifikasinya (misalnya dari segi warna atau bentuk) agar hasilnya tetap orisinal dan mencerminkan identitas tim.",
		},
	],
};

export default function UIUXPage() {
	return <CompetitionPageLayout data={uiuxData} />;
}
