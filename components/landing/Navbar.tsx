"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
	Menu,
	Flag,
	PenTool,
	Mic,
	MoonStar,
	ArrowRight,
	Bot,
	ChevronDown,
	Home,
	Info,
	LayoutGrid,
	Calendar,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetClose,
} from "@/components/ui/sheet";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

type MenuItem = {
	title: string;
	href: string;
	description: string;
	icon: React.ElementType;
	bgURL?: string;
};

const competitionComponents: MenuItem[] = [
	{
		title: "Capture The Flag",
		href: "/ctf",
		description: "Cyber Sentinel 2025: Break the Code, Secure the Future.",
		icon: Flag,
		bgURL: "https://storage.theaceundip.id/assets/ctf-bg-picture.webp",
	},
	{
		title: "UI/UX Design",
		href: "/uiux",
		description: "Impactful Innovation: Designing Sustainable Solutions.",
		icon: PenTool,
		bgURL: "https://storage.theaceundip.id/assets/uiux-bg-picture.webp",
	},
	{
		title: "Line Follower",
		href: "/line-follower",
		description: "Algorithmic Edge: Precision in Motion, Unrivaled Victory.",
		icon: Bot,
		bgURL: "https://storage.theaceundip.id/assets/ftl-bg-picture.webp",
	},
];

const eventComponents: MenuItem[] = [
	{
		title: "Seminar",
		href: "/seminar",
		description: "Join our expert-led seminar on the future of tech.",
		icon: Mic,
	},
	{
		title: "Malam Puncak",
		href: "/malam-puncak",
		description: "A Night for Computer Engineering Celebration",
		icon: MoonStar,
	},
];

const defaultCompetition: MenuItem = {
	title: "Capture The Flag",
	href: "/ctf",
	description: "Cyber Sentinel 2025: Break the Code, Secure the Future.",
	icon: Flag,
	bgURL: "https://storage.theaceundip.id/assets/ctf-bg-picture.webp",
};

function MobileLink({
	href,
	children,
	icon: Icon,
	pathname,
}: {
	href: string;
	children: React.ReactNode;
	icon?: React.ElementType;
	pathname: string;
}) {
	const isActive = pathname === href;

	return (
		<SheetClose asChild>
			<Link
				href={href}
				className={cn(
					"flex items-center gap-4 rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
					isActive && "bg-primary/10 font-semibold text-primary"
				)}
			>
				{Icon && <Icon className={cn("h-5 w-5", isActive && "text-primary")} />}
				<span>{children}</span>
			</Link>
		</SheetClose>
	);
}

export default function Navbar() {
	const [hoveredCompetition, setHoveredCompetition] =
		React.useState<MenuItem>(defaultCompetition);
	const [isCompetitionOpen, setIsCompetitionOpen] = React.useState(false);
	const [isEventOpen, setIsEventOpen] = React.useState(false);
	const [isVisible, setIsVisible] = React.useState(true);
	const [lastScrollY, setLastScrollY] = React.useState(0);

	const pathname = usePathname();

	const isCompetitionSectionActive = React.useMemo(
		() => competitionComponents.some((item) => pathname === item.href),
		[pathname]
	);
	const isEventSectionActive = React.useMemo(
		() => eventComponents.some((item) => pathname === item.href),
		[pathname]
	);

	React.useEffect(() => {
		const controlNavbar = () => {
			if (typeof window !== "undefined") {
				if (window.scrollY > lastScrollY && window.scrollY > 80) {
					setIsVisible(false);
				} else {
					setIsVisible(true);
				}
				setLastScrollY(window.scrollY);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("scroll", controlNavbar);
			return () => {
				window.removeEventListener("scroll", controlNavbar);
			};
		}
	}, [lastScrollY]);

	return (
		<nav
			className={cn(
				"fixed z-50 w-full px-4 top-4 md:px-0 transition-all duration-300 ease-in-out",
				isVisible
					? "translate-y-0 scale-100 opacity-100"
					: "-translate-y-full scale-95 opacity-0"
			)}
		>
			<div className="container flex items-center justify-between max-w-screen-xl px-4 py-2 transition-all bg-white shadow-xl md:mx-auto rounded-2xl md:pl-8 md:pr-2 hover:shadow-2xl">
				<Link href="/" className="md:hidden">
					<Image
						src="https://storage.theaceundip.id/assets/TheAce-Mini-Logo.png"
						height={40}
						width={40}
						alt="Logo The Ace"
					/>
				</Link>

				<div className="items-center hidden gap-1 md:flex">
					<Link
						href="/home"
						className="inline-flex items-center justify-center h-10 px-4 py-2 text-base font-medium transition-colors rounded-md hover:bg-accent hover:text-accent-foreground"
					>
						Home
					</Link>
					<div
						className="relative"
						onMouseEnter={() => setIsCompetitionOpen(true)}
						onMouseLeave={() => setIsCompetitionOpen(false)}
					>
						<button
							className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50"
							data-state={isCompetitionOpen ? "open" : "closed"}
						>
							Competition{" "}
							<ChevronDown
								className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
								aria-hidden="true"
							/>
						</button>
						{isCompetitionOpen && (
							<div className="absolute left-0 w-auto pt-5 top-full animate-sub-menu-open">
								<div className="absolute w-0 h-0 -translate-x-1/2 border-b-8 border-l-8 border-r-8 top-3 left-20 border-l-transparent border-r-transparent border-b-white" />
								<div className="grid gap-2 p-3 bg-white border-b border-x rounded-lg shadow-lg md:w-[500px] lg:grid-cols-[0.75fr_1fr] lg:items-stretch">
									<div className="flex">
										<a
											className="relative flex flex-col justify-end w-full h-full p-6 overflow-hidden no-underline bg-center bg-no-repeat bg-cover rounded-md outline-none select-none"
											style={{
												backgroundImage: `url(${hoveredCompetition.bgURL})`,
												minHeight: "200px",
											}}
											href={hoveredCompetition.href}
										>
											<div className="absolute inset-0 rounded-md bg-secondary/50" />

											<div className="z-10 flex flex-col justify-end">
												<hoveredCompetition.icon className="w-8 h-8 text-primary drop-shadow-xl" />
												<div className="mt-2 text-lg font-medium text-white drop-shadow-xl">
													{hoveredCompetition.title}
												</div>
											</div>
										</a>
									</div>

									<div className="flex flex-col justify-between h-full">
										{competitionComponents.map((component) => (
											<Link
												key={component.title}
												href={component.href}
												className="p-2 rounded-md hover:bg-accent"
												onMouseEnter={() => setHoveredCompetition(component)}
											>
												<p className="font-medium">{component.title}</p>
												<p className="text-sm text-muted-foreground">
													{component.description}
												</p>
											</Link>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
					<div
						className="relative"
						onMouseEnter={() => setIsEventOpen(true)}
						onMouseLeave={() => setIsEventOpen(false)}
					>
						<button
							className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50"
							data-state={isEventOpen ? "open" : "closed"}
						>
							Event{" "}
							<ChevronDown
								className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
								aria-hidden="true"
							/>
						</button>
						{isEventOpen && (
							<div className="absolute left-0 w-auto pt-5 top-full animate-sub-menu-open">
								<div className="absolute w-0 h-0 -translate-x-1/2 border-b-8 border-l-8 border-r-8 top-3 left-12 border-l-transparent border-r-transparent border-b-white" />
								<div className="w-[300px] p-2 bg-white border-x rounded-lg shadow-lg">
									{eventComponents.map((component) => (
										<Link
											key={component.title}
											href={component.href}
											className="flex items-start gap-2 px-2 py-3 transition-colors rounded-md hover:bg-accent group"
										>
											<div className="p-2 my-auto transition-colors rounded-full bg-accent text-primary group-hover:bg-primary group-hover:text-white">
												<component.icon className="w-5 h-5" strokeWidth={1.5} />
											</div>
											<div className="ml-2">
												<p className="font-medium">{component.title}</p>
												<p className="text-sm text-muted-foreground">
													{component.description}
												</p>
											</div>
										</Link>
									))}
								</div>
							</div>
						)}
					</div>
					<Link
						href="/about"
						className="inline-flex items-center justify-center h-10 px-4 py-2 text-base font-medium transition-colors rounded-md hover:bg-accent hover:text-accent-foreground"
					>
						About
					</Link>
				</div>
				<div className="items-center hidden gap-2 md:flex">
					<Link href="/auth/login">
						<Button
							variant="ghost"
							className="relative px-6 py-2 overflow-hidden text-base rounded-lg group"
						>
							<span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out bg-orange-100 text-primary group-hover:translate-x-full">
								Login
							</span>

							<span
								className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out -translate-x-full bg-orange-100 text-primary group-hover:translate-x-0"
								aria-hidden="true"
							>
								Login
							</span>

							<span className="invisible">Login</span>
						</Button>
					</Link>
					<Link href="/auth/register" className="w-full">
						<Button className="relative w-full p-1 overflow-hidden transition-colors duration-300 rounded-lg bg-primary hover:bg-orange-400 group">
							<div className="flex items-center w-full h-full mr-4 transition-transform duration-300 ease-out group-hover:translate-x-[5.15rem]">
								<div className="flex items-center justify-center p-2 bg-white rounded-md">
									<ArrowRight className="text-primary" size={16} />
								</div>
								<div className="flex items-center justify-center flex-1 h-full pl-2 text-base text-white">
									Register
								</div>
							</div>

							<div className="absolute top-0 left-0 flex items-center w-full h-full transition-transform duration-300 ease-out -translate-x-full group-hover:-translate-x-3">
								<div className="flex items-center justify-center flex-1 h-full text-base text-white">
									Register
								</div>
							</div>
						</Button>
					</Link>
				</div>
				<div className="flex md:hidden">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<Menu className="w-6 h-6" />
								<span className="sr-only">Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="flex flex-col w-full h-full max-w-sm p-0"
						>
							<SheetHeader className="p-4 border-b">
								<SheetTitle className="sr-only">Main Menu</SheetTitle>
								<SheetClose asChild>
									<Link href="/" className="flex justify-center">
										<Image
											src="https://storage.theaceundip.id/assets/TheAce-Mini-Logo.png"
											height={100}
											width={100}
											alt="Logo The Ace"
										/>
									</Link>
								</SheetClose>
							</SheetHeader>
							<div className="flex-1 p-4 space-y-1 overflow-y-auto">
								<MobileLink href="/" icon={Home} pathname={pathname}>
									Home
								</MobileLink>
								<Accordion type="single" collapsible className="w-full">
									<AccordionItem value="competition" className="border-none">
										<AccordionTrigger
											className={cn(
												"px-3 py-3 text-base font-medium rounded-lg hover:bg-accent hover:no-underline text-muted-foreground",
												isCompetitionSectionActive &&
													"text-primary font-semibold"
											)}
										>
											<div className="flex items-center gap-4">
												<LayoutGrid
													className={cn(
														"w-5 h-5 text-muted-foreground",
														isCompetitionSectionActive && "text-primary"
													)}
												/>
												<span>Competition</span>
											</div>
										</AccordionTrigger>
										<AccordionContent className="pt-1 pb-0 pl-8 ml-5 border-l-2">
											{competitionComponents.map((component) => (
												<MobileLink
													key={component.href}
													href={component.href}
													icon={component.icon}
													pathname={pathname}
												>
													{component.title}
												</MobileLink>
											))}
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="event" className="border-none">
										<AccordionTrigger
											className={cn(
												"px-3 py-3 text-base font-medium rounded-lg hover:bg-accent hover:no-underline text-muted-foreground",
												isEventSectionActive && "text-primary font-semibold"
											)}
										>
											<div className="flex items-center gap-4">
												<Calendar
													className={cn(
														"w-5 h-5 text-muted-foreground",
														isEventSectionActive && "text-primary"
													)}
												/>
												<span>Event</span>
											</div>
										</AccordionTrigger>
										<AccordionContent className="pt-1 pb-0 pl-8 ml-5 border-l-2">
											{eventComponents.map((component) => (
												<MobileLink
													key={component.href}
													href={component.href}
													icon={component.icon}
													pathname={pathname}
												>
													{component.title}
												</MobileLink>
											))}
										</AccordionContent>
									</AccordionItem>
								</Accordion>
								<MobileLink href="/about" icon={Info} pathname={pathname}>
									About
								</MobileLink>
							</div>

							<div className="flex flex-col gap-3 p-4 mt-auto border-t">
								<SheetClose asChild>
									<Link href="/auth/login">
										<Button
											variant="ghost"
											className="justify-center w-full text-base bg-orange-100 rounded-lg text-primary hover:bg-orange-200 hover:text-primary"
										>
											Login
										</Button>
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link href="/auth/register">
										<Button className="w-full text-base text-white rounded-lg bg-primary hover:bg-orange-400">
											Register
										</Button>
									</Link>
								</SheetClose>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</nav>
	);
}
