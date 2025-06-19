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
			"https://drive.google.com/file/d/1kAy5RIuUiRTJBpmxvhvooePZkWDePpWD/view?usp=drive_link",
		documents:
			"https://drive.google.com/drive/folders/1Tsiq0QsXpLV3lccZp59VU_JLoI42Kj3f?usp=drive_link",
		whatsapp: "https://chat.whatsapp.com/J8fMNtp8s386Q3okj9g4VX",
	},
	[COMPETITION_KEYS.UI_UX]: {
		guidebook:
			"https://drive.google.com/file/d/1Lw0ZEv1GTMq_p9I5PNHn_7Pl-F_IDUxm/view?usp=drive_link",
		documents:
			"https://drive.google.com/drive/folders/1v2qCCfe3kOP1enwb42pKhw0Wpa63n8Eh?usp=drive_link",
		whatsapp: "https://chat.whatsapp.com/KDzJOBJE7aT52MrkiBy4Pt",
	},
	[COMPETITION_KEYS.FTL]: {
		guidebook:
			"https://drive.google.com/file/d/10Hld8d8AtEcSJlCqAX53QJiykfN1FrVn/view?usp=drive_link",
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
					<div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
						<CheckCircle className="w-6 h-6 text-green-600" />
					</div>
					<CardTitle className="text-3xl font-bold">
						Pendaftaran Berhasil!
					</CardTitle>
					<CardDescription className="px-2 text-md">
						Data tim dan anggota Anda telah kami simpan. Selamat datang di The
						ACE!
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="py-4 border-t border-b">
						<h3 className="mb-3 font-semibold text-md text-muted-foreground">
							LANGKAH SELANJUTNYA
						</h3>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<Button asChild variant="outline" size="lg" className="px-1">
								<a
									href={communityTheAce}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Users className="mr-2 size-4 text-secondary" />
									Community The Ace
								</a>
							</Button>

							<Button asChild variant="outline" size="lg" className="px-1">
								<a
									href={links.whatsapp}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Users className="mr-2 size-4 text-secondary" />
									Group Whatsapp{competitionName}
								</a>
							</Button>

							<Button asChild variant="outline" size="lg" className="px-1">
								<a
									href={links.guidebook}
									target="_blank"
									rel="noopener noreferrer"
								>
									<FileText className="mr-2 size-4 text-secondary" />
									Guidebook {competitionName}
								</a>
							</Button>

							<Button asChild variant="outline" size="lg" className="px-1">
								<a href={formPeserta} target="_blank" rel="noopener noreferrer">
									<FileUserIcon className="mr-2 size-4 text-secondary" />
									Formulir Peserta
								</a>
							</Button>

							<Button asChild variant="outline" size="lg" className="px-1">
								<a
									href={links.documents}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Folder className="mr-2 size-4 text-secondary" />
									Dokumen {competitionName}
								</a>
							</Button>

							<Button asChild variant="outline" size="lg" className="px-1">
								<a
									href={sponsorDocument}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Cloud className="mr-2 size-4 text-secondary" />
									Klaim CloudKilat
								</a>
							</Button>
						</div>
					</div>
					<p className="px-4 text-sm text-muted-foreground">
						Pastikan Anda bergabung ke grup WhatsApp untuk mendapatkan informasi
						penting dan terbaru seputar kompetisi.
					</p>
				</CardContent>
				<CardFooter>
					<Button asChild size="lg" className="w-full text-white">
						<Link href={APP_ROUTES.DASHBOARD}>
							Lanjutkan ke Dashboard
							<ArrowRight className="w-5 h-5 ml-2" />
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</AuthLayout>
	);
}
