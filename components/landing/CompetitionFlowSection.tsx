"use client";
import { useRef, useState, useEffect, useCallback, FC, memo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Tipe untuk data kartu yang lebih kaya
interface CardData {
	id: number;
	image: string;
	tag: string;
	step: string;
	title: string;
	description: string;
	alt?: string;
}

// Tipe untuk props komponen ScrollCard
interface ScrollCardProps {
	card: CardData;
	index: number;
	cardClassName?: string;
	tagClassName?: string;
	imageClassName?: string;
}

// Komponen kartu yang di-memoized
const ScrollCard: FC<ScrollCardProps> = memo(
	({ card, index, cardClassName, tagClassName, imageClassName }) => {
		const [isLoaded, setIsLoaded] = useState(false);

		return (
			<div
				className={`scroll-card absolute w-full h-full rounded-lg overflow-hidden ${cardClassName}`}
			>
				{/* Tag Tahapan (di pojok) */}
				<div
					className={`absolute top-4 left-4 px-2 py-2 rounded bg-black z-10 ${tagClassName}`}
				>
					<p className="font-mono text-xs antialiased font-semibold leading-none uppercase">
						{card.tag}
					</p>
				</div>

				<div className="relative w-full h-full">
					{/* Gambar Latar Belakang */}
					<Image
						src={card.image}
						alt={card.alt || card.title || ""}
						fill
						sizes="(max-width: 768px) 95vw, 50vw"
						className={`object-cover transition-opacity duration-300 ${
							isLoaded ? "opacity-100" : "opacity-0"
						} ${imageClassName}`}
						onLoad={() => setIsLoaded(true)}
						priority={index < 2}
						quality={85}
					/>

					{/* Overlay Teks di Tengah */}
					<div className="absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
						<div className="flex flex-col items-center text-center text-white gap-y-2 md:gap-y-3">
							{/* Teks Step */}
							{/* <p className="font-mono text-sm tracking-widest uppercase">
								{card.step}
							</p> */}
							{/* Teks Judul Utama */}
							<h2 className="text-3xl font-bold md:text-5xl drop-shadow-lg">
								{card.title}
							</h2>
							{/* Teks Deskripsi */}
							<p className="max-w-md text-sm font-light md:text-base opacity-90">
								{card.description}
							</p>
						</div>
					</div>

					{/* Placeholder Loading */}
					{!isLoaded && (
						<div className="absolute inset-0 flex items-center justify-center bg-neutral-800 animate-pulse">
							<div className="w-8 h-8 border-2 border-white rounded-full border-t-transparent animate-spin" />
						</div>
					)}
				</div>
			</div>
		);
	}
);

ScrollCard.displayName = "ScrollCard";

// Data statis yang diperkaya dengan step dan deskripsi
const CARDS_DATA: CardData[] = [
	{
		id: 1,
		image: "https://storage.theaceundip.id/assets/Step1-Pendaftaran.webp",
		tag: "Tahap 1",
		step: "Step 1",
		title: "Pendaftaran Lomba",
		description:
			"Buka gerbang kompetisi dengan mendaftarkan tim dan ide cemerlang Anda.",
	},
	{
		id: 2,
		image: "https://storage.theaceundip.id/assets/Step2-Pelaksanaan.webp",
		tag: "Tahap 2",
		step: "Step 2",
		title: "Pelaksanaan Lomba",
		description:
			"Peserta mengerjakan kasus, mengembangkan prototipe, dan menunjukkan keahlian.",
	},
	{
		id: 3,
		image: "https://storage.theaceundip.id/assets/Step3-Pelaksanaan-Final.webp",
		tag: "Tahap 3",
		step: "Step 3",
		title: "Final Lomba",
		description:
			"Tim terbaik mempresentasikan hasil karya mereka di hadapan para juri ahli.",
	},
	{
		id: 4,
		image:
			"https://storage.theaceundip.id/assets/Step4-Pengumuman-Pemenang.webp",
		tag: "Tahap 4",
		step: "Step 4",
		title: "Pengumuman Pemenang",
		description:
			"Momen yang ditunggu-tunggu, pemenang dari setiap kategori diumumkan.",
	},
	{
		id: 5,
		image:
			"https://storage.theaceundip.id/assets/Step5-Awarding-dan-Seminar-Nasional.webp",
		tag: "Puncak Acara",
		step: "Step 5",
		title: "Awarding & Seminar",
		description:
			"Perayaan kemenangan, penyerahan hadiah, dan seminar inspiratif dari para pakar.",
	},
];

interface ScrollCardsProps {
	className?: string;
	containerClassName?: string;
	cardClassName?: string;
	tagClassName?: string;
	imageClassName?: string;
	height?: string;
	containerSize?: string;
	disabled?: boolean;
	threshold?: number;
}

export default function CompetitionFlowSection({
	className = "",
	containerClassName = "",
	cardClassName = "",
	tagClassName = "",
	imageClassName = "",
	height = "h-screen",
	containerSize = "w-[95%] h-[60%] lg:w-1/2 lg:h-1/2",
	disabled = false,
	threshold = 0.1,
}: ScrollCardsProps) {
	const container = useRef<HTMLElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [animationsEnabled, setAnimationsEnabled] = useState(true);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		setAnimationsEnabled(!mediaQuery.matches);
		const handleChange = (e: MediaQueryListEvent) =>
			setAnimationsEnabled(!e.matches);
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	useEffect(() => {
		if (disabled || !animationsEnabled) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold, rootMargin: "50px" }
		);
		if (container.current) {
			observer.observe(container.current);
		}
		return () => observer.disconnect();
	}, [disabled, animationsEnabled, threshold]);

	const setupAnimations = useCallback(() => {
		if (!isVisible || disabled || !animationsEnabled || !container.current)
			return;

		gsap.registerPlugin(ScrollTrigger);

		const cardElements =
			container.current.querySelectorAll<HTMLDivElement>(".scroll-card");
		const totalCards = cardElements.length;

		if (totalCards === 0) return;

		requestAnimationFrame(() => {
			gsap.set(cardElements[0], {
				y: "0%",
				scale: 1,
				rotation: 0,
				willChange: "transform",
			});
			for (let i = 1; i < totalCards; i++) {
				gsap.set(cardElements[i], {
					y: "100%",
					scale: 1,
					rotation: 0,
					willChange: "transform",
				});
			}

			const scrollTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: container.current,
					start: "top top",
					end: `+=${window.innerHeight * (totalCards - 1)}`,
					pin: true,
					scrub: 0.5,
					invalidateOnRefresh: true,
					anticipatePin: 1,
				},
			});

			for (let i = 0; i < totalCards - 1; i++) {
				scrollTimeline
					.to(
						cardElements[i],
						{ scale: 0.5, rotation: 10, duration: 1, ease: "none" },
						i
					)
					.to(cardElements[i + 1], { y: "0%", duration: 1, ease: "none" }, i);
			}

			return () => {
				scrollTimeline.kill();
				ScrollTrigger.getAll().forEach((trigger) => {
					if (trigger.trigger === container.current) {
						trigger.kill();
					}
				});
				gsap.set(cardElements, { willChange: "auto" });
			};
		});
	}, [isVisible, disabled, animationsEnabled]);

	useGSAP(setupAnimations, {
		scope: container,
		dependencies: [isVisible, CARDS_DATA.length, disabled, animationsEnabled],
	});

	if (disabled && !isVisible) {
		return null;
	}

	return (
		<section
			className={`scroll-cards-section relative w-full ${height} bg-[#012A43] overflow-hidden flex flex-col justify-center items-center text-white ${className}`}
			ref={container}
			style={{
				contain: "layout style paint",
				transform: "translate3d(0,0,0)",
			}}
		>
			<div className="px-4 mb-4 text-center text-white">
				<h2 className="mb-4 text-5xl font-bold md:text-6xl font-lora">
					Competition Flow
				</h2>
				<p className="max-w-2xl mx-auto text-lg md:text-xl opacity-80 2xl:max-w-4xl font-lora">
					Phase by phase of Competition on The ACE 2025.
				</p>
			</div>

			<div
				className={`scroll-cards-container mb-8 relative ${containerSize} rounded-lg overflow-hidden ${containerClassName}`}
			>
				{CARDS_DATA.map((card, index) => (
					<ScrollCard
						key={card.id}
						card={card}
						index={index}
						cardClassName={cardClassName}
						tagClassName={tagClassName}
						imageClassName={imageClassName}
					/>
				))}
			</div>
		</section>
	);
}
