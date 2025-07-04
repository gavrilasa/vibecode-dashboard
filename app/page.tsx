import Navbar from "@/components/landing/Navbar";
import Image from "next/image";
import CompetitionCategorySection from "@/components/landing/CompetitionCategorySection";
import CompetitionFlowSection from "@/components/landing/CompetitionFlowSection";
import Footer from "@/components/landing/Footer";
import SponsorSection from "@/components/landing/SponsorSection";
import MediaPartnerSection from "@/components/landing/MediaPartnerSection";
import PrizePoolSection from "@/components/landing/PrizePoolSection";

export default function Home() {
	return (
		<main className="bg-[#012A43]">
			<section className="relative min-h-screen bg-[url(https://storage.theaceundip.id/assets/compressed-bg-theace.webp)] bg-cover bg-center">
				<div className="relative z-20">
					<Navbar />
					<div className="flex items-center justify-center w-full min-h-screen">
						<div className="relative w-[80vw] max-w-xl aspect-square">
							<Image
								src="https://storage.theaceundip.id/assets/logo.webp"
								fill
								alt="Logo The Ace"
								className="object-contain"
								sizes="(max-width: 768px) 80vw, 512px"
								priority
							/>
							<div className="absolute bottom-[-64px] left-1/2 transform -translate-x-1/2 animate-bounce">
								<Image
									src="https://storage.theaceundip.id/assets/Diamond-Bounce.svg"
									width={32}
									height={32}
									alt="Diamond Decoration"
								/>
							</div>
						</div>
					</div>
				</div>
				<div
					className="
            absolute -bottom-4 left-0 w-full h-24 z-10
            bg-[linear-gradient(to_bottom,rgba(1,42,67,0.1)_0%,#012A43_80%)]
          "
				></div>
			</section>

			<PrizePoolSection />

			<section>
				<CompetitionCategorySection />
			</section>

			<CompetitionFlowSection />

			<SponsorSection />

			<MediaPartnerSection />

			<Footer />
		</main>
	);
}
