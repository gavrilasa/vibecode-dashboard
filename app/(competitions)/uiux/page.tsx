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
		"https://drive.google.com/file/d/1Lw0ZEv1GTMq_p9I5PNHn_7Pl-F_IDUxm/view?usp=drive_link",
	countdownTarget: new Date("2025-07-10T23:59:59"),
	terms: [
		"Peserta merupakan mahasiswa/i aktif (D1-S1) atau siswa/i (SMA/SMK).",
		"Satu tim terdiri dari 2-3 anggota dari institusi yang sama.",
		"Setiap peserta hanya boleh terdaftar dalam satu tim di kompetisi UI/UX.",
		"Karya yang diusulkan harus orisinil dan belum pernah diikutsertakan dalam kompetisi lain.",
		"Desain harus sesuai dengan tema utama dan memilih minimal satu dari subtema SDGs yang ditentukan.",
		"Segala bentuk kecurangan atau plagiarisme akan mengakibatkan diskualifikasi.",
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
		{ name: "Pengumpulan Karya", date: "11 Juli – 2 Agustus 2025" },
		{ name: "Pengumuman Finalis", date: "19 Agustus 2025" },
		{ name: "Technical Meeting Finalis", date: "24 Agustus 2025" },
		{ name: "Pelaksanaan Final", date: "31 Agustus 2025" },
		{ name: "Pengumuman Pemenang", date: "31 Agustus 2025" },
	],
	faqs: [
		{
			question: "Berapa jumlah anggota tim yang diperbolehkan?",
			answer:
				"Tim harus terdiri dari 2 hingga 3 anggota. Setiap anggota tim harus berasal dari institusi yang sama.",
		},
		{
			question: "Apa saja platform yang bisa dijadikan studi kasus?",
			answer:
				"Peserta diwajibkan untuk memilih platform mobile (iOS atau Android) sebagai basis dari desain aplikasi yang dibuat.",
		},
		{
			question: "Bagaimana format pengumpulan karya?",
			answer:
				"Karya dikumpulkan dalam format PDF yang di dalamnya berisi link menuju prototipe Figma, video demo, dan dokumen pendukung lainnya sesuai yang tertera di guidebook.",
		},
		{
			question: "Apakah ada subtema yang harus dipilih?",
			answer:
				"Ya, karya harus sesuai dengan tema utama dan memilih minimal satu dari lima subtema yang telah disediakan: No More Poverty, Good Health and Well-Being, Quality Education, Reduced Inequality, atau Peace, Justice, and Strong Institutions.",
		},
	],
};

export default function UIUXPage() {
	return <CompetitionPageLayout data={uiuxData} />;
}
