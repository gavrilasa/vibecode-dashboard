// app/registration/success/page.tsx

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { APP_ROUTES } from "@/lib/constants";
import { CheckCircle, BookOpen, MessageSquare, ArrowRight } from "lucide-react";
import Image from "next/image";

// Ganti dengan URL asli Anda
const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/your-group-invite-code";
const GUIDEBOOK_LINK = "https://link-to-your.guidebook.pdf";

export default function RegistrationSuccessPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
			<Card className="w-full max-w-lg text-center shadow-lg">
				<CardHeader className="items-center space-y-3">
					<div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
						<CheckCircle className="h-12 w-12 text-green-500" />
					</div>
					<CardTitle className="text-3xl font-bold">
						Pendaftaran Berhasil!
					</CardTitle>
					<CardDescription className="text-lg">
						Data tim dan anggota Anda telah kami simpan. Selamat datang di The
						ACE!
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="border-t border-b py-4">
						<h3 className="text-md font-semibold text-muted-foreground mb-3">
							LANGKAH SELANJUTNYA
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{/* Tombol Grup WhatsApp */}
							<Button asChild variant="outline" size="lg">
								<a
									href={WHATSAPP_GROUP_LINK}
									target="_blank"
									rel="noopener noreferrer"
								>
									<MessageSquare className="mr-2 h-5 w-5" />
									Grup WhatsApp
								</a>
							</Button>

							{/* Tombol Guidebook */}
							<Button asChild variant="outline" size="lg">
								<a
									href={GUIDEBOOK_LINK}
									target="_blank"
									rel="noopener noreferrer"
								>
									<BookOpen className="mr-2 h-5 w-5" />
									Unduh Guidebook
								</a>
							</Button>
						</div>
					</div>
					<p className="text-sm text-muted-foreground px-4">
						Pastikan Anda bergabung ke grup WhatsApp untuk mendapatkan informasi
						penting dan terbaru seputar kompetisi.
					</p>
				</CardContent>
				<CardFooter>
					<Button asChild size="lg" className="w-full text-white">
						<Link href={APP_ROUTES.DASHBOARD}>
							Lanjutkan ke Dashboard
							<ArrowRight className="ml-2 h-5 w-5" />
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
