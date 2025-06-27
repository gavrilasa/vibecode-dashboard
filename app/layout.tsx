import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { Outfit, Lora } from "next/font/google";

const outfit = Outfit({
	subsets: ["latin"],
	variable: "--font-outfit",
});

const lora = Lora({
	subsets: ["latin"],
	variable: "--font-lora",
});

export const metadata: Metadata = {
	title: "The Ace 2025",
	description: "The Ace Competition Platform",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${outfit.variable} ${lora.variable} font-sans`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
