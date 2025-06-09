// app/auth/sending-email/page.tsx
"use client";

import Link from "next/link";
import { MailCheck } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function SendingEmailPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
			<Card className="w-full max-w-md text-center">
				<CardHeader>
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
						<MailCheck className="h-6 w-6 text-green-600" />
					</div>
					<CardTitle className="mt-4 text-2xl">Confirm Your Email</CardTitle>
					<CardDescription>
						We&apos;ve sent a verification link to your email address. Please
						check your inbox (and spam folder) to complete your registration.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Didn&apos;t receive an email?{" "}
						<Link href="#" className="font-medium text-primary hover:underline">
							Resend link
						</Link>
					</p>
					<p className="mt-4 text-sm">
						<Link
							href="/auth/login"
							className="font-medium text-primary hover:underline"
						>
							&larr; Back to Login
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
