"use client";

import { Instagram, Mail, Music2 } from "lucide-react";

export default function Footer() {
	return (
		<div className="bg-white min-h-48">
			<div className="relative z-20 h-4 bg-white md:h-12"> </div>

			<div className="relative z-0 -mt-2 -mb-2 text-center md:-mt-6 md::-mb-6">
				<h1 className="text-4xl font-extrabold select-none sm:text-7xl md:text-8xl lg:text-9xl text-primary">
					theaceundip.id
				</h1>
			</div>

			<div className="relative z-20 p-4 bg-white">
				<div className="max-w-xl mx-auto">
					<div className="flex flex-col items-center justify-center text-sm sm:flex-row sm:justify-between">
						<div className="text-primary">
							<p>©{new Date().getFullYear()} theaceundip.id</p>
						</div>

						<div className="hidden sm:flex sm:flex-col sm:items-center sm:gap-4 md:flex-row md:gap-12">
							<div className="flex items-center space-x-3">
								<a
									href="#"
									aria-label="Instagram"
									className="flex items-center justify-center w-8 h-8 text-white transition-colors rounded-full bg-primary hover:bg-primary/80"
								>
									<Instagram size={16} />
								</a>
								<a
									href="#"
									aria-label="Tiktok"
									className="flex items-center justify-center w-8 h-8 text-white transition-colors rounded-full bg-primary hover:bg-primary/80"
								>
									<Music2 size={16} />
								</a>
							</div>
						</div>
						<div className="hidden sm:flex sm:flex-col sm:items-center sm:gap-4 md:flex-row md:gap-12">
							<a
								href="mailto:theace25.tekkom@gmail.com"
								className="flex items-center gap-2 text-primary hover:underline"
							>
								<Mail size={16} />
								<span>theace25.tekkom@gmail.com</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
