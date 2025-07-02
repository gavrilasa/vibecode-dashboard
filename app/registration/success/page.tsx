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
	Gamepad,
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
			"https://drive.google.com/file/d/12bHX-j6ThqhkHdQcX5LyJWN4X0hlzzWr/view?usp=drive_link",
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
			"https://drive.google.com/file/d/1Buqhh-YwtDABUKwik1VaPjY6BaAiLjaO/view?usp=drive_link",
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

	if (!selectedCompetition) {
		return null;
	}

	const competitionNameLower = selectedCompetition.name.toLowerCase();
	let competitionKey: keyof typeof competitionLinks = "default";
	let displayCompetitionName: string;

	if (competitionNameLower.includes(COMPETITION_KEYS.CTF)) {
		competitionKey = COMPETITION_KEYS.CTF;
		displayCompetitionName = "CTF";
	} else if (competitionNameLower.includes(COMPETITION_KEYS.UI_UX)) {
		competitionKey = COMPETITION_KEYS.UI_UX;
		displayCompetitionName = "UI/UX";
	} else if (competitionNameLower.includes(COMPETITION_KEYS.FTL)) {
		competitionKey = COMPETITION_KEYS.FTL;
		displayCompetitionName = "Line Follower";
	} else {
		displayCompetitionName = selectedCompetition.name;
	}

	return (
		<AuthLayout>
			<Card className="w-full max-w-md text-center">
				<CardHeader className="items-center space-y-4">
					<div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
						<CheckCircle className="w-8 h-8 text-green-600" />
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
						<h3 className="mb-4 font-semibold tracking-wider uppercase text-md text-muted-foreground">
							Langkah Selanjutnya
						</h3>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<Button asChild variant="outline">
								<a
									href={communityTheAce}
									target="_blank"
									rel="noopener noreferrer"
									className="justify-start"
								>
									<Users className="mr-3 size-4 text-secondary" />
									Community The Ace
								</a>
							</Button>
							<Button asChild variant="outline">
								<a
									target="_blank"
									rel="noopener noreferrer"
									className="justify-start"
								>
									<Users className="mr-3 size-4 text-secondary" />
									Grup {displayCompetitionName}
								</a>
							</Button>
							<Button asChild variant="outline">
								<a
									target="_blank"
									rel="noopener noreferrer"
									className="justify-start"
								>
									<FileText className="mr-3 size-4 text-secondary" />
									Guidebook {displayCompetitionName}
								</a>
							</Button>
							<Button asChild variant="outline">
								<a
									href={formPeserta}
									target="_blank"
									rel="noopener noreferrer"
									className="justify-start"
								>
									<FileUserIcon className="mr-3 size-4 text-secondary" />
									Formulir Peserta
								</a>
							</Button>
							<Button asChild variant="outline">
								<a
									target="_blank"
									rel="noopener noreferrer"
									className="justify-start"
								>
									<Folder className="mr-3 size-4 text-secondary" />
									Dokumen {displayCompetitionName}
								</a>
							</Button>
							<Button asChild variant="outline">
								<a
									href={sponsorDocument}
									target="_blank"
									rel="noopener noreferrer"
									className="justify-start"
								>
									<Cloud className="mr-3 size-4 text-secondary" />
									Klaim CloudKilat
								</a>
							</Button>
							{competitionKey === COMPETITION_KEYS.CTF && (
								<Button asChild variant="outline" className="col-span-2">
									<a
										href="https://discord.gg/n7277zQTC3"
										target="_blank"
										rel="noopener noreferrer"
										className="justify-start"
									>
										<Gamepad className="mr-3 size-4 text-secondary" />
										Discord CTF
									</a>
								</Button>
							)}
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
