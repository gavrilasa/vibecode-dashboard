// components/landing/PrizePoolSection.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const PrizePoolSection = () => {
	const [count, setCount] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const hasAnimated = useRef(false);

	const numberFormatter = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	useEffect(() => {
		const section = sectionRef.current;
		const card = cardRef.current;

		if (!section || !card) return;

		// Enhanced animation sequence
		const tl = gsap.timeline({ paused: true });

		// Card entrance with smooth scale and fade
		tl.fromTo(
			card,
			{ scale: 0.9, opacity: 0 },
			{ scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
		)
			// Enhanced number counting with better easing
			.to(
				{ val: 0 },
				{
					val: 15000000,
					duration: 2.5,
					ease: "power3.out",
					onUpdate: function () {
						setCount(Math.round(this.targets()[0].val));
					},
				},
				"-=0.3"
			);

		ScrollTrigger.create({
			trigger: section,
			start: "top 75%",
			onEnter: () => {
				if (!hasAnimated.current) {
					setIsVisible(true);
					tl.play();
					hasAnimated.current = true;
				}
			},
		});

		return () => {
			tl.kill();
			ScrollTrigger.getAll().forEach((trigger) => {
				if (trigger.trigger === section) {
					trigger.kill();
				}
			});
		};
	}, []);

	// Enhanced star component with smooth animation
	const Star = ({
		className,
		...props
	}: { className?: string } & React.HTMLAttributes<SVGElement>) => (
		<svg
			className={cn("absolute text-white/70 animate-pulse", className)}
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				animation:
					"pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite, float 4s ease-in-out infinite",
			}}
			{...props}
		>
			<path d="M12 2L14.09 8.26L20 10.37L14.09 12.48L12 18.74L9.91 12.48L4 10.37L9.91 8.26L12 2Z" />
		</svg>
	);

	return (
		<>
			<style jsx>{`
				@keyframes float {
					0%,
					100% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-8px);
					}
				}

				.number-glow {
					filter: drop-shadow(0 0 20px rgba(251, 146, 60, 0.3));
				}

				.card-hover {
					transition: all 0.3s ease;
				}

				.card-hover:hover {
					transform: translateY(-2px);
					box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
						0 0 30px rgba(59, 130, 246, 0.2);
				}
			`}</style>

			<section
				ref={sectionRef}
				className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b"
			>
				<div className="container px-4 sm:px-6 lg:px-8 mx-auto text-center">
					<div
						className={cn(
							"p-2 sm:p-4 mb-6 sm:mb-8 text-center text-white transition-all duration-700",
							isVisible
								? "translate-y-0 opacity-100"
								: "translate-y-4 opacity-0"
						)}
					>
						<h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-lora leading-tight">
							Prize Pool
						</h2>
						<p className="text-base sm:text-lg md:text-xl opacity-80 max-w-xs sm:max-w-2xl lg:max-w-4xl mx-auto font-lora px-4 sm:px-0">
							Total Prize The Ace 2025 Competition
						</p>
					</div>

					{/* Enhanced prize card */}
					<div
						ref={cardRef}
						className="relative p-4 sm:p-6 lg:p-8 overflow-hidden text-white rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-900/30 via-black/5 to-blue-900/30 border border-white/10 shadow-xl sm:shadow-2xl shadow-primary/10 card-hover mx-2 sm:mx-0"
					>
						{/* Floating stars with enhanced animation - mobile optimized */}
						<div className="absolute inset-0 z-0 opacity-60">
							<Star
								className="w-2 sm:w-3 h-2 sm:h-3 top-1/4 left-1/4"
								style={{ animationDelay: "0.2s" }}
							/>
							<Star
								className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 top-[15%] right-[15%]"
								style={{ animationDelay: "0.8s" }}
							/>
							<Star
								className="w-1.5 sm:w-2 h-1.5 sm:h-2 bottom-[10%] left-[20%]"
								style={{ animationDelay: "1.2s" }}
							/>
							<Star
								className="w-3 sm:w-4 h-3 sm:h-4 bottom-[15%] right-[25%]"
								style={{ animationDelay: "1.6s" }}
							/>
							<Star
								className="hidden sm:block w-2 md:w-3 h-2 md:h-3 top-[50%] left-[30%]"
								style={{ animationDelay: "2s" }}
							/>
							<Star
								className="hidden sm:block w-1.5 md:w-2 h-1.5 md:h-2 top-[60%] right-[40%]"
								style={{ animationDelay: "2.4s" }}
							/>
							<Star
								className="hidden lg:block w-4 h-4 bottom-[30%] left-[45%]"
								style={{ animationDelay: "2.8s" }}
							/>
						</div>

						{/* Main prize amount with enhanced styling - mobile responsive */}
						<div className="relative z-10">
							<p
								className={cn(
									"my-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold font-lora text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-primary number-glow",
									"transition-all duration-500 leading-none",
									isVisible && "scale-105"
								)}
							>
								{numberFormatter.format(count)}+
							</p>
						</div>

						{/* Subtle accent line - mobile responsive */}
						<div
							className={cn(
								"absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full transition-all duration-1000",
								isVisible ? "w-16 sm:w-24 opacity-100" : "w-0 opacity-0"
							)}
						></div>
					</div>
				</div>
			</section>
		</>
	);
};

export default PrizePoolSection;
