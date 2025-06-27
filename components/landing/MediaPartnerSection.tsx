"use client";

import React from "react";

const mediaPartners = [
	{
		name: "Media Partner 1",
		logoUrl:
			"https://placehold.co/200x100/FFFFFF/000000?text=Partner+1&font=raleway",
	},
	{
		name: "Media Partner 2",
		logoUrl:
			"https://placehold.co/200x100/FFFFFF/000000?text=Partner+2&font=raleway",
	},
	{
		name: "Media Partner 3",
		logoUrl:
			"https://placehold.co/200x100/FFFFFF/000000?text=Partner+3&font=raleway",
	},
	{
		name: "Media Partner 4",
		logoUrl:
			"https://placehold.co/200x100/FFFFFF/000000?text=Partner+4&font=raleway",
	},
	{
		name: "Media Partner 5",
		logoUrl:
			"https://placehold.co/200x100/FFFFFF/000000?text=Partner+5&font=raleway",
	},
	{
		name: "Media Partner 6",
		logoUrl:
			"https://placehold.co/200x100/FFFFFF/000000?text=Partner+6&font=raleway",
	},
	{
		name: "Media Partner 7",
		logoUrl:
			"https://placehold.co/200x100/FFFFFF/000000?text=Partner+7&font=raleway",
	},
	{
		name: "Media Partner 8",
		logoUrl:
			"https://placehold.co/200x100/FFFFFF/000000?text=Partner+8&font=raleway",
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

					{/* Infinite Scroller Container */}
					<div className="relative w-full">
						{/* Scroller Wrapper - menyembunyikan overflow dan menambahkan efek fade di tepi */}
						<div className="relative w-full overflow-hidden">
							{/* Inner Scroller - berisi logo dan animasi */}
							<div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
								{extendedPartners.map((partner, index) => (
									// Ukuran dan gap diperkecil di sini
									<div key={index} className="flex-shrink-0 w-32 mx-4">
										{/* Kartu logo dengan efek glassmorphism dan aspek rasio 1:1 */}
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

							{/* Efek Fade di sisi kiri dan kanan disesuaikan dengan background baru */}
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
