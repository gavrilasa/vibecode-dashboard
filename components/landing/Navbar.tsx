"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Menu,
	Code,
	PenTool,
	Mic,
	Wrench,
	RocketIcon,
	Bot,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
};

const competitionComponents: MenuItem[] = [
	{
		title: "Web Development",
		href: "/competition/web",
		description: "Compete to build the most innovative web application.",
		icon: Code,
	},
	{
		title: "UI/UX Design",
		href: "/competition/uiux",
		description: "Design a user-friendly and visually appealing interface.",
		icon: PenTool,
	},
	{
		title: "Line Follower",
		href: "/competition/line-follower",
		description: "Build and program a robot to follow a line course.",
		icon: Bot,
	},
];

const eventComponents: MenuItem[] = [
	{
		title: "Seminar",
		href: "/event/seminar",
		description: "Join our expert-led seminar on the future of tech.",
		icon: Mic,
	},
	{
		title: "Workshop",
		href: "/event/workshop",
		description: "Get hands-on experience in our interactive workshop.",
		icon: Wrench,
	},
];

const defaultCompetition: MenuItem = {
	title: "The ACE",
	href: "/",
	description: "Annual event to showcase tech skills and innovation.",
	icon: RocketIcon,
};

export default function Navbar() {
	const [hoveredCompetition, setHoveredCompetition] =
		React.useState<MenuItem>(defaultCompetition);

	return (
		<nav className="fixed z-50 w-full px-4 top-4 md:px-0">
			<div className="container flex items-center justify-between max-w-screen-xl px-4 py-2 transition-all bg-white shadow-xl md:mx-auto rounded-2xl md:pl-4 md:pr-2 hover:shadow-2xl">
				<Link href="/" className="flex justify-center md:hidden">
					<Image
						src="https://storage.theaceundip.id/assets/TheAce-Mini-Logo.png"
						height={48}
						width={48}
						alt="Logo The Ace"
						className="object-fill"
					/>
				</Link>

				{/* --- PERUBAHAN DI SINI --- */}
				{/* Menghapus `flex-1` dan `justify-center` agar layout lebih sederhana dan terpusat secara alami */}
				<div className="items-center hidden md:flex">
					<NavigationMenu>
						<NavigationMenuList className="gap-2 text-base">
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link
										href="/home"
										className={cn(navigationMenuTriggerStyle(), "text-base")}
									>
										Home
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuTrigger
									className="text-base"
									onMouseLeave={() => setHoveredCompetition(defaultCompetition)}
								>
									Competition
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
										<li className="row-span-3">
											<NavigationMenuLink asChild>
												<a
													className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none from-muted/50 to-muted bg-gradient-to-b focus:shadow-md"
													href={hoveredCompetition.href}
												>
													<hoveredCompetition.icon className="w-8 h-8 text-primary" />
													<div className="mt-4 mb-2 text-lg font-medium">
														{hoveredCompetition.title}
													</div>
													<p className="text-sm leading-tight text-muted-foreground">
														{hoveredCompetition.description}
													</p>
												</a>
											</NavigationMenuLink>
										</li>
										{competitionComponents.map((component) => (
											<ListItem
												key={component.title}
												title={component.title}
												href={component.href}
												onMouseEnter={() => setHoveredCompetition(component)}
											>
												{component.description}
											</ListItem>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuTrigger className="text-base">
									Event
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[300px] gap-3 p-4">
										{eventComponents.map((component) => (
											<ListItem
												key={component.title}
												title={component.title}
												href={component.href}
												icon={component.icon}
											>
												{component.description}
											</ListItem>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link
										href="/about"
										className={cn(navigationMenuTriggerStyle(), "text-base")}
									>
										About
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div className="items-center hidden gap-2 md:flex">
					<Link href="/auth/login">
						<Button
							variant="ghost"
							className="text-base bg-orange-100 rounded-lg text-primary hover:bg-orange-200 hover:text-primary"
						>
							Login
						</Button>
					</Link>
					<Link href="/auth/register">
						<Button className="text-base text-white rounded-lg bg-primary hover:bg-orange-400">
							<span className="mr-2">→</span> Register
						</Button>
					</Link>
				</div>

				<div className="flex justify-end flex-1 md:hidden">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<Menu className="w-6 h-6" />
								<span className="sr-only">Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-full h-full p-0">
							<SheetHeader className="sr-only">
								<SheetTitle>Main Menu</SheetTitle>
							</SheetHeader>
							<div className="p-4 border-b">
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
							</div>
							<div className="flex flex-col h-full">
								<div className="flex-1 p-4 space-y-2">
									<MobileLink href="/">Home</MobileLink>
									<Accordion type="single" collapsible className="w-full">
										<AccordionItem value="competition">
											<AccordionTrigger className="text-base font-semibold">
												Competition
											</AccordionTrigger>
											<AccordionContent className="pl-4">
												{competitionComponents.map((component) => (
													<MobileLink
														key={component.href}
														href={component.href}
													>
														{component.title}
													</MobileLink>
												))}
											</AccordionContent>
										</AccordionItem>
										<AccordionItem value="event">
											<AccordionTrigger className="text-base font-semibold">
												Event
											</AccordionTrigger>
											<AccordionContent className="pl-4">
												{eventComponents.map((component) => (
													<MobileLink
														key={component.href}
														href={component.href}
													>
														{component.title}
													</MobileLink>
												))}
											</AccordionContent>
										</AccordionItem>
									</Accordion>
									<MobileLink href="/about">About</MobileLink>
								</div>
								<div className="flex flex-col gap-2 p-4 border-t">
									<SheetClose asChild>
										<Link href="/auth/login">
											<Button
												variant="ghost"
												className="justify-start w-full text-base"
											>
												Login
											</Button>
										</Link>
									</SheetClose>
									<SheetClose asChild>
										<Link href="/auth/register">
											<Button className="w-full text-base">Register</Button>
										</Link>
									</SheetClose>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</nav>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<typeof Link>,
	React.ComponentPropsWithoutRef<typeof Link> & { icon?: React.ElementType }
>(({ className, title, children, href, icon: Icon, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<Link
					ref={ref}
					href={href!}
					className={cn(
						"flex items-start gap-3 p-3 no-underline outline-none select-none rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					{Icon && (
						<div className="flex-shrink-0 w-6 mt-1 text-primary">
							<Icon className="w-full h-full" strokeWidth={1.5} />
						</div>
					)}
					<div className="flex-1">
						<div className="text-base font-medium leading-none">{title}</div>
						<p className="mt-1 text-sm leading-snug line-clamp-2 text-muted-foreground">
							{children}
						</p>
					</div>
				</Link>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";

function MobileLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<SheetClose asChild>
			<Link
				href={href}
				className="block px-2 py-2 text-base font-semibold rounded-md hover:bg-accent"
			>
				{children}
			</Link>
		</SheetClose>
	);
}
