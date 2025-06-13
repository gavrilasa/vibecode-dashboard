// app/registration/success/page.tsx

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { APP_ROUTES, COMPETITION_KEYS } from "@/lib/constants";
import {
	CheckCircle,
	ArrowRight,
	Users,
	FileText,
	FileUserIcon,
	Folder,
	Cloud,
} from "lucide-react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { useRegistrationFlowStore } from "@/store/registration-flow-store";

const communityTheAce = "https://chat.whatsapp.com/LdMPa4TRzo3BnW2nnfbua6";
const sponsorDocument =
	"https://drive.google.com/drive/folders/1LTVJwBYXV3UxM2NAZADA2nxjiRd48pBn?usp=drive_link";
const formPeserta =
	"https://docs.google.com/document/d/1DPIaVSE84u4ESu4-NNkKsmwYrhX1KXwt/edit?usp=drive_link&ouid=101549707681531278662&rtpof=true&sd=true";

const competitionLinks = {
	[COMPETITION_KEYS.CTF]: {
		guidebook:
			"https://drive.google.com/file/d/1cEvHRjHtN3EPkGMcflwWYFDu6pTl0Nzw/view?usp=drive_link",
		documents:
			"https://drive.google.com/drive/folders/1Tsiq0QsXpLV3lccZp59VU_JLoI42Kj3f?usp=drive_link",
		whatsapp: "https://chat.whatsapp.com/J8fMNtp8s386Q3okj9g4VX",
	},
	[COMPETITION_KEYS.UI_UX]: {
		guidebook:
			"https://drive.google.com/file/d/13KhvnJqqUetSC-gA_cWXEyp_fm_E9hNd/view?usp=drive_link",
		documents:
			"https://drive.google.com/drive/folders/1v2qCCfe3kOP1enwb42pKhw0Wpa63n8Eh?usp=drive_link",
		whatsapp: "https://chat.whatsapp.com/KDzJOBJE7aT52MrkiBy4Pt",
	},
	[COMPETITION_KEYS.FTL]: {
		guidebook:
			"https://drive.google.com/file/d/1nn55SbXfzw54sWcbhqUAK-K6Oo3w8GZP/view?usp=drive_link",
		documents:
			"https://drive.google.com/drive/folders/19UeJchIJl4tlYMsRCPWDn08fFHT-bNLC?usp=drive_link",
		whatsapp: "https://chat.whatsapp.com/G1j6ZEgEhm0IELR8iptZuX",
	},
	default: {
		guidebook: "#",
		documents: "#",
		whatsapp: "#",
	},
};

export default function RegistrationSuccessPage() {
	const { selectedCompetition, clearFlow } = useRegistrationFlowStore();

	useEffect(() => {
		return () => {
			clearFlow();
		};
	}, [clearFlow]);

	const competitionName = selectedCompetition?.name.toLowerCase() || "";
	let competitionKey: keyof typeof competitionLinks = "default";

	if (competitionName.includes(COMPETITION_KEYS.CTF)) {
		competitionKey = COMPETITION_KEYS.CTF;
	} else if (competitionName.includes(COMPETITION_KEYS.UI_UX)) {
		competitionKey = COMPETITION_KEYS.UI_UX;
	} else if (competitionName.includes(COMPETITION_KEYS.FTL)) {
		competitionKey = COMPETITION_KEYS.FTL;
	}

	const links = competitionLinks[competitionKey];

	return (
		<AuthLayout>
			<Card className="w-full max-w-md text-center">
				<CardHeader className="items-center space-y-4">
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
						<CheckCircle className="h-6 w-6 text-green-600" />
					</div>
					<CardTitle className="text-3xl font-bold">
						Pendaftaran Berhasil!
					</CardTitle>
					<CardDescription className="text-md px-2">
						Data tim dan anggota Anda telah kami simpan. Selamat datang di The
						ACE!
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="border-t border-b py-4">
						<h3 className="text-md font-semibold text-muted-foreground mb-3">
							LANGKAH SELANJUTNYA
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<Button asChild variant="outline" size="lg" className="px-1">
								<a
									href={communityTheAce}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Users className="size-4 mr-2 text-secondary" />
									Community The Ace
								</a>
							</Button>

							<Button asChild variant="outline" size="lg" className="px-1">
								<a
									href={links.whatsapp}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Users className="size-4 mr-2 text-secondary" />
									Group Whatsapp{competitionName}
								</a>
							</Button>

							<Button asChild variant="outline" size="lg" className="px-1">
								<a
									href={links.whatsapp}
									target="_blank"
									rel="noopener noreferrer"
								>
									<FileText className="size-4 mr-2 text-secondary" />
									Guidebook {competitionName}
								</a>
							</Button>

							<Button asChild variant="outline" size="lg" className="px-1">
								<a href={formPeserta} target="_blank" rel="noopener noreferrer">
									<FileUserIcon className="size-4 mr-2 text-secondary" />
									Formulir Peserta
								</a>
							</Button>

							<Button asChild variant="outline" size="lg" className="px-1">
								<a
									href={links.documents}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Folder className="size-4 mr-2 text-secondary" />
									Dokumen {competitionName}
								</a>
							</Button>

							<Button asChild variant="outline" size="lg" className="px-1">
								<a
									href={links.documents}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Cloud className="size-4 mr-2 text-secondary" />
									Klaim CloudKilat
								</a>
							</Button>
						</div>
					</div>
					<p className="text-sm text-muted-foreground px-4">
						Pastikan Anda bergabung ke grup WhatsApp untuk mendapatkan informasi
						penting dan terbaru seputar kompetisi.
					</p>
				</CardContent>
				<CardFooter>
					<Button asChild size="lg" className="w-full text-white">
						<Link href={APP_ROUTES.DASHBOARD}>
							Lanjutkan ke Dashboard
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</AuthLayout>
	);
}
