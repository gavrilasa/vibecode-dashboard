"use client";

import React from "react";

const mediaPartners = [
	{
		name: "Logo-HMDTIF",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-HMDTIF.webp",
	},
	{
		name: "Logo-HMS",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-HMS.webp",
	},
	{
		name: "Logo-HME",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-HME.webp",
	},
	{
		name: "Logo-HMTL",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-HMTL.webp",
	},
	{
		name: "Logo-HM-Geodesi",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-HM-Geodesi.webp",
	},
	{
		name: "Logo-HMTI",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-HMTI.webp",
	},
	{
		name: "Logo-HMA",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-HMA.webp",
	},
	{
		name: "Logo-Himaspal",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-Himaspal.webp",
	},
	{
		name: "Logo-HMTG",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-HMTG.webp",
	},
	{
		name: "Logo-FST",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-FST.webp",
	},
	{
		name: "Logo-InfoLombaIT",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-InfoLombaIT.webp",
	},
	{
		name: "Logo-AtapLangit",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-AtapLangit.webp",
	},
	{
		name: "Logo-Parjo",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-Parjo.webp",
	},
	{
		name: "Logo-TeknoEventKampus",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-TeknoEventKampus.webp",
	},
	{
		name: "Logo-TeknoEvent",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-TeknoEvent.webp",
	},
	{
		name: "Logo-LombaUIUX",
		logoUrl: "https://storage.theaceundip.id/assets/Logo-LombaUIUX.webp",
	},
];

const MediaPartnerSection = () => {
	const extendedPartners = [...mediaPartners, ...mediaPartners];

	return (
		<>
			<style jsx global>{`
				@keyframes scroll {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}
				.animate-scroll {
					animation: scroll 40s linear infinite;
				}
			`}</style>

			<section className="bg-[#012A43] py-12 overflow-hidden">
				<div className="container mx-auto">
					<div className="px-4 my-12 text-center text-white">
						<h2 className="mb-4 text-5xl font-bold md:text-6xl font-lora">
							Media Partners
						</h2>
					</div>

					<div className="relative w-full">
						<div className="relative w-full overflow-hidden">
							<div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
								{extendedPartners.map((partner, index) => (
									<div key={index} className="flex-shrink-0 w-32 mx-4">
										<div className="flex items-center justify-center p-2 border rounded-lg shadow-lg aspect-square bg-white/10 backdrop-blur-sm border-white/20">
											<img
												src={partner.logoUrl}
												alt={partner.name}
												className="object-contain max-w-full max-h-full"
											/>
										</div>
									</div>
								))}
							</div>

							<div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#012A43] to-transparent pointer-events-none"></div>
							<div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#012A43] to-transparent pointer-events-none"></div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default MediaPartnerSection;
