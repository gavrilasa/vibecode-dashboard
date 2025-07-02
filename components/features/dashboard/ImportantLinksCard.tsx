// File: components/features/dashboard/ImportantLinksCard.tsx

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { COMPETITION_KEYS } from "@/lib/constants";
import { Competition } from "@/types/competition";
import {
	Users,
	FileText,
	Folder,
	MessageSquare,
	Cloud,
	Phone,
	Link,
	Gamepad,
} from "lucide-react";

const communityTheAce = "https://chat.whatsapp.com/LdMPa4TRzo3BnW2nnfbua6";
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

const contactPersons = {
	[COMPETITION_KEYS.CTF]: [
		{ name: "(Azzam)", link: "https://wa.me/6281331437810" },
		{ name: "(Lady)", link: "https://wa.me/6282215492024" },
	],
	[COMPETITION_KEYS.UI_UX]: [
		{ name: "(Rakha)", link: "https://wa.me/6282225935161" },
		{ name: "(Yasmin)", link: "https://wa.me/6282246208311" },
		{ name: "(Arman)", link: "https://wa.me/6281808058008" },
	],
	[COMPETITION_KEYS.FTL]: [
		{ name: "(Gibson)", link: "https://wa.me/6281381065979" },
		{ name: "(Cielo)", link: "https://wa.me/6288214862030" },
	],
	default: [
		{ name: "Contact Person 1", link: "#" },
		{ name: "Contact Person 2", link: "#" },
	],
};

interface ImportantLinksCardProps {
	competition: Omit<Competition, "batches">;
}

export function ImportantLinksCard({ competition }: ImportantLinksCardProps) {
	const competitionName = competition.name.toLowerCase();
	let competitionKey: keyof typeof competitionLinks = "default";
	let displayCompetitionName: string;

	if (competitionName.includes(COMPETITION_KEYS.CTF)) {
		competitionKey = COMPETITION_KEYS.CTF;
		displayCompetitionName = "CTF";
	} else if (competitionName.includes(COMPETITION_KEYS.UI_UX)) {
		competitionKey = COMPETITION_KEYS.UI_UX;
		displayCompetitionName = "UI/UX";
	} else if (competitionName.includes(COMPETITION_KEYS.FTL)) {
		competitionKey = COMPETITION_KEYS.FTL;
		displayCompetitionName = "Line Follower";
	} else {
		displayCompetitionName = competition.name;
	}

	const links = competitionLinks[competitionKey];
	const contacts = contactPersons[competitionKey];

	return (
		<Card>
			<CardHeader className="pb-3 space-y-2">
				<CardTitle className="flex items-center space-x-2">
					<Link className="w-5 h-5 text-primary" href={"#"} />
					<span>Tautan Penting & Kontak</span>
				</CardTitle>
				<CardDescription>
					Akses cepat ke dokumen, panduan, dan narahubung resmi.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-1 gap-3 lg:grid-cols-2">
				<Button asChild variant="outline" className="justify-start">
					<a href={links.guidebook} target="_blank" rel="noopener noreferrer">
						<FileText className="w-4 h-4 mr-3 text-secondary" /> Guidebook Lomba{" "}
						{displayCompetitionName}
					</a>
				</Button>
				<Button asChild variant="outline" className="justify-start">
					<a href={links.documents} target="_blank" rel="noopener noreferrer">
						<Folder className="w-4 h-4 mr-3 text-secondary" /> Dokumen Peserta{" "}
						{displayCompetitionName}
					</a>
				</Button>
				<Button asChild variant="outline" className="justify-start">
					<a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
						<MessageSquare className="w-4 h-4 mr-3 text-secondary" /> Grup
						WhatsApp {displayCompetitionName}
					</a>
				</Button>
				<Button asChild variant="outline" className="justify-start">
					<a href={communityTheAce} target="_blank" rel="noopener noreferrer">
						<Users className="w-4 h-4 mr-3 text-secondary" /> Komunitas The ACE
					</a>
				</Button>
				<Button asChild variant="outline" className="justify-start">
					<a href={formPeserta} target="_blank" rel="noopener noreferrer">
						<Cloud className="w-4 h-4 mr-3 text-secondary" /> Klaim CloudKilat
					</a>
				</Button>
				{displayCompetitionName === "CTF" && (
					<Button asChild variant="outline" className="justify-start">
						<a
							href="https://discord.gg/n7277zQTC3"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Gamepad className="w-4 h-4 mr-3 text-secondary" /> Discord CTF
						</a>
					</Button>
				)}
				{contacts.map((cp, index) => (
					<Button
						asChild
						key={index}
						variant="outline"
						className="justify-start"
					>
						<a href={cp.link} target="_blank" rel="noopener noreferrer">
							<Phone className="w-4 h-4 mr-3 text-secondary" /> Contact Person{" "}
							{cp.name}
						</a>
					</Button>
				))}
			</CardContent>
		</Card>
	);
}
