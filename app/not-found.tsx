import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4 bg-[url(https://storage.theaceundip.id/assets/compressed-bg-theace.webp)] bg-cover bg-center">
			<Card className="w-full max-w-md text-center">
				<CardHeader className="space-y-4">
					<div className="mx-auto">
						<AlertTriangle className="h-12 w-12 text-destructive" />
					</div>
					<CardTitle className="mt-4 text-3xl font-bold">
						404 - Page Not Found
					</CardTitle>
					<CardDescription className="text-base px-2">
						Sorry, the page you are looking for does not exist or has been
						moved.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button asChild className="w-full text-white">
						<Link href="/dashboard">Back to Home</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
