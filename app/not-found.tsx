"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function NotFound() {
	const router = useRouter();

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4 bg-[url(https://storage.theaceundip.id/assets/compressed-bg-theace.webp)] bg-cover bg-center">
			<Card className="w-full max-w-md text-center">
				<CardHeader className="space-y-4">
					<div className="mx-auto">
						<Wrench className="w-12 h-12 text-primary" />
					</div>
					<CardTitle className="mt-4 text-3xl font-bold">
						Halaman dalam Perbaikan
					</CardTitle>
					<CardDescription className="px-2 text-base">
						Maaf, halaman ini sedang dalam pengerjaan. Silakan kembali lagi
						nanti.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button onClick={() => router.back()} className="w-full text-white">
						Kembali
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
