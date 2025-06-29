import Image from "next/image";

type Tier = "gold" | "silver" | "bronze";

interface Sponsor {
	name: string;
	tier: Tier;
	logoUrl: string;
	websiteUrl: string;
}

interface SponsorCardProps {
	sponsor: Sponsor;
}

interface TierSectionProps {
	sponsors: Sponsor[];
	cardSizeClass: string;
	borderColor: string;
}

const sponsorsData: Sponsor[] = [
	{
		name: "Cloud Kilat",
		tier: "gold",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-CloudKilat.webp",
		websiteUrl: "https://www.cloudkilat.com/",
	},
	{
		name: "IDN",
		tier: "gold",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-IDN.webp",
		websiteUrl: "https://www.idn.id/",
	},
	{
		name: "Oronamin C",
		tier: "silver",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-OronaminC.webp",
		websiteUrl: "https://oronaminc.id/",
	},
	{
		name: "IndoPrinting",
		tier: "bronze",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-IndoPrinting.webp",
		websiteUrl: "https://indoprinting.co.id/",
	},
	{
		name: "Fad Shop",
		tier: "bronze",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-FadShop.webp",
		websiteUrl: "#",
	},
];

const SponsorCard = ({
	sponsor,
	borderColor,
}: SponsorCardProps & { borderColor: string }) => {
	const { name, logoUrl, websiteUrl } = sponsor;

	return (
		<a
			href={websiteUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={`
    relative flex items-center justify-center aspect-square overflow-hidden
    bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg
    transition-all duration-300 hover:bg-white/20 hover:scale-105 
    border-2 ${borderColor}
  `}
		>
			<Image
				src={logoUrl}
				alt={`Logo ${name}`}
				width={500}
				height={500}
				className="object-contain rounded-xl"
			/>
		</a>
	);
};

const TierSection = ({
	sponsors,
	cardSizeClass,
	borderColor,
}: TierSectionProps) => {
	if (sponsors.length === 0) return null;

	return (
		<div className="flex flex-wrap items-center justify-center gap-8">
			{sponsors.map((sponsor) => (
				<div key={sponsor.name} className={cardSizeClass}>
					<SponsorCard sponsor={sponsor} borderColor={borderColor} />
				</div>
			))}
		</div>
	);
};

const SponsorSection = () => {
	const goldSponsors = sponsorsData.filter((s) => s.tier === "gold");
	const silverSponsors = sponsorsData.filter((s) => s.tier === "silver");
	const bronzeSponsors = sponsorsData.filter((s) => s.tier === "bronze");

	return (
		<section className="bg-[#012A43]">
			<div className="container py-24 mx-auto space-y-8">
				<div className="px-4 text-center text-white">
					<h2 className="mb-4 text-5xl font-bold md:text-6xl font-lora">
						Event Sponsor
					</h2>
					<p className="max-w-2xl px-4 mx-auto text-lg md:text-xl opacity-80 2xl:max-w-4xl font-lora">
						Special thanks to our partners for supporting this event.
					</p>
				</div>

				<div className="flex flex-col gap-y-12">
					<TierSection
						sponsors={goldSponsors}
						cardSizeClass="w-8/12 sm:w-5/12 md:w-4/12 lg:w-3/12"
						borderColor="border-yellow-400/60 p-5 md:p-6"
					/>
					<TierSection
						sponsors={silverSponsors}
						cardSizeClass="w-6/12 sm:w-4/12 md:w-3/12 lg:w-1/5"
						borderColor="border-slate-300/60 p-4 md:p-5"
					/>
					<TierSection
						sponsors={bronzeSponsors}
						cardSizeClass="w-1/3 sm:w-1/4 md:w-2/12 lg:w-[15%]"
						borderColor="border-amber-600/60 p-3 md:p-4"
					/>
				</div>
			</div>
		</section>
	);
};

export default SponsorSection;
