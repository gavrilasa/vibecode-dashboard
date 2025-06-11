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
import { CheckCircle, BookOpen, MessageSquare, ArrowRight } from "lucide-react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { useRegistrationFlowStore } from "@/store/registration-flow-store";

const competitionLinks = {
	[COMPETITION_KEYS.CTF]: {
		guidebook: "https://example.com/guidebook-ctf.pdf",
		whatsapp: "https://chat.whatsapp.com/GROUP_ID_CTF",
	},
	[COMPETITION_KEYS.UI_UX]: {
		guidebook: "https://example.com/guidebook-uiux.pdf",
		whatsapp: "https://chat.whatsapp.com/GROUP_ID_UIUX",
	},
	[COMPETITION_KEYS.FTL]: {
		guidebook: "https://example.com/guidebook-ftl.pdf",
		whatsapp: "https://chat.whatsapp.com/GROUP_ID_FTL",
	},
	default: {
		guidebook: "#",
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
							{/* Tombol Grup WhatsApp Dinamis */}
							<Button asChild variant="outline" size="lg">
								<a
									href={links.whatsapp}
									target="_blank"
									rel="noopener noreferrer"
								>
									<MessageSquare className="mr-2 h-5 w-5" />
									Grup WhatsApp
								</a>
							</Button>

							{/* Tombol Guidebook Dinamis */}
							<Button asChild variant="outline" size="lg">
								<a
									href={links.guidebook}
									target="_blank"
									rel="noopener noreferrer"
								>
									<BookOpen className="mr-2 h-5 w-5" />
									Unduh Guidebook
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
