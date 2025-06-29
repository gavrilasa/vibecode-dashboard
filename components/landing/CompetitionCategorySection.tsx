"use client";

import { useEffect, useRef, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ReactLenis, LenisRef } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
	frontSrc: string;
	frontAlt: string;
	backSrc: string;
	backAlt: string;
	href: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
	({ frontSrc, frontAlt, backSrc, backAlt, href }, ref) => {
		return (
			<div
				ref={ref}
				className="relative w-4/5 max-w-[240px] aspect-[2/3] [perspective:1000px] md:absolute md:w-[240px] 2xl:w-[320px] group"
			>
				<Link href={href} className="block w-full h-full" aria-label={frontAlt}>
					<div className="relative w-full h-full [transform-style:preserve-3d] [will-change:transform] group-hover:cursor-pointer transition-transform duration-300 group-hover:scale-105">
						<div className="absolute w-full h-full overflow-hidden rounded-xl [backface-visibility:hidden]">
							<Image
								priority
								src={frontSrc}
								width={480}
								height={720}
								alt={frontAlt}
								className="object-cover w-full h-full"
							/>
						</div>
						<div className="absolute w-full h-full overflow-hidden rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
							<Image
								src={backSrc}
								width={480}
								height={720}
								alt={backAlt}
								className="object-cover w-full h-full"
							/>
						</div>
					</div>
				</Link>
			</div>
		);
	}
);

Card.displayName = "Card";

export default function CompetitionCategorySection() {
	const cardData = [
		{
			id: 1,
			frontSrc: "https://storage.theaceundip.id/assets/Border-Front-Card.webp",
			backSrc: "https://storage.theaceundip.id/assets/Border-CTF-Card.webp",
			alt: "Competition Card CTF",
			href: "/ctf",
		},
		{
			id: 2,
			frontSrc: "https://storage.theaceundip.id/assets/Border-Front-Card.webp",
			backSrc:
				"https://storage.theaceundip.id/assets/Border-UIUXDesign-Card.webp",
			alt: "Competition Card UI/UX",
			href: "/uiux",
		},
		{
			id: 3,
			frontSrc: "https://storage.theaceundip.id/assets/Border-Front-Card.webp",
			backSrc:
				"https://storage.theaceundip.id/assets/Border-LineFollower-Card.webp",
			alt: "Competition Card Line Follower",
			href: "/line-follower",
		},
	];

	const container = useRef<HTMLDivElement>(null);
	const cardRefs = useRef<HTMLDivElement[]>([]);
	const lenisRef = useRef<LenisRef>(null);

	useEffect(() => {
		function update(time: number) {
			lenisRef.current?.lenis?.raf(time * 1000);
		}
		gsap.ticker.add(update);
		return () => {
			gsap.ticker.remove(update);
		};
	}, []);

	useGSAP(
		() => {
			gsap.set(cardRefs.current, {
				willChange: "transform, left, top, rotation",
			});

			const mm = gsap.matchMedia();

			const desktopAnimation = (
				horizontalPositions: number[],
				verticalPosition: string
			) => {
				const cards = cardRefs.current;
				if (!cards || cards.length === 0) return;

				gsap.set(cards, {
					top: verticalPosition,
					left: "50%",
					xPercent: -50,
					yPercent: -50,
				});

				const rotation = [-10, 0, 10];
				const totalScrollHeight = window.innerHeight * 3;

				ScrollTrigger.create({
					trigger: ".cards-container",
					start: "top top",
					end: `+=${totalScrollHeight}`,
					pin: true,
					pinSpacing: true,
				});

				cards.forEach((card, index) => {
					gsap.to(card, {
						left: `${horizontalPositions[index]}%`,
						rotation: `${rotation[index]}`,
						ease: "none",
						scrollTrigger: {
							trigger: ".cards-container",
							start: "top top",
							end: `+=${window.innerHeight}`,
							scrub: 0.5,
						},
					});

					const flipContainer = card.querySelector("a > div");
					if (!flipContainer) return;
					const frontEl = flipContainer.children[0] as HTMLElement;
					const backEl = flipContainer.children[1] as HTMLElement;
					if (!frontEl || !backEl) return;

					const staggerOffset = index * 0.05;
					const startOffset = 1 / 3 + staggerOffset;
					const endOffset = 2 / 3 + staggerOffset;

					ScrollTrigger.create({
						trigger: ".cards-container",
						start: "top top",
						end: `+=${totalScrollHeight}`,
						scrub: 1,
						onUpdate: (self) => {
							const progress = self.progress;

							if (progress < startOffset) {
								gsap.set(frontEl, { rotateY: 0 });
								gsap.set(backEl, { rotateY: 180 });
								gsap.set(card, { rotate: rotation[index] });
							} else if (progress <= endOffset) {
								const animationProgress = (progress - startOffset) / (1 / 3);
								gsap.to(frontEl, {
									rotateY: -180 * animationProgress,
									ease: "none",
								});
								gsap.to(backEl, {
									rotateY: 180 - 180 * animationProgress,
									ease: "none",
								});
								gsap.to(card, {
									rotate: rotation[index] * (1 - animationProgress),
									ease: "none",
								});
							} else {
								gsap.set(frontEl, { rotateY: -180 });
								gsap.set(backEl, { rotateY: 0 });
								gsap.set(card, { rotate: 0 });
							}
						},
					});
				});
			};

			mm.add("(min-width: 768px) and (max-width: 1535px)", () => {
				desktopAnimation([30, 50, 70], "60%");
			});

			mm.add("(min-width: 1536px)", () => {
				desktopAnimation([32, 50, 68], "55%");
			});

			mm.add("(max-width: 767px)", () => {
				const cards = cardRefs.current;
				if (!cards || cards.length === 0) return;

				cards.forEach((card) => {
					const flipContainer = card.querySelector("a > div");
					if (!flipContainer) return;
					const frontEl = flipContainer.children[0] as HTMLElement;
					const backEl = flipContainer.children[1] as HTMLElement;
					if (!frontEl || !backEl) return;

					ScrollTrigger.create({
						trigger: card,
						start: "top bottom",
						end: "center center",
						scrub: 0.5,
						onUpdate: (self) => {
							const progress = self.progress;
							gsap.to(frontEl, { rotateY: -180 * progress, ease: "none" });
							gsap.to(backEl, { rotateY: 180 - 180 * progress, ease: "none" });
						},
					});
				});
			});

			return () => {
				mm.revert();
			};
		},
		{ scope: container }
	);

	useEffect(() => {
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<div ref={container} className="w-full bg-inherit">
			<ReactLenis root ref={lenisRef} options={{ autoRaf: false }} />
			<section className="relative flex flex-col items-center w-full gap-8 cards-container md:block md:h-screen md:gap-0">
				<div className="px-4 pt-4 text-center text-white md:pt-32 2xl:pt-40">
					<h2 className="mb-4 text-5xl font-bold md:text-6xl font-lora">
						Competition Category
					</h2>
					<p className="text-lg max-w-2xl mx-auto md:text-xl opacity-80 2xl:max-w-4xl font-lora">
						Discover the exciting competitions available in The ACE 2025.
					</p>
				</div>
				{cardData.map((card, index) => (
					<Card
						key={card.id}
						frontSrc={card.frontSrc}
						backSrc={card.backSrc}
						frontAlt={card.alt}
						backAlt={`Back of ${card.alt}`}
						href={card.href}
						ref={(el: HTMLDivElement | null) => {
							if (el) cardRefs.current[index] = el;
						}}
					/>
				))}
			</section>
		</div>
	);
}
