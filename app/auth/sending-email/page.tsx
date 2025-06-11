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
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";

export default function SendingEmailPage() {
	return (
		<AuthLayout>
			<Card className="w-full max-w-md text-center">
				<CardHeader className="space-y-4">
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
						<MailCheck className="h-6 w-6 text-green-600" />
					</div>
					<CardTitle className="mt-4 text-2xl">Confirm Your Email</CardTitle>
					<CardDescription className="text-base px-2">
						We&apos;ve sent a verification link to your email address. Please
						check your inbox{" "}
						<span className="font-medium">(and spam folder)</span> to complete
						your registration.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-base text-muted-foreground">
						Didn&apos;t receive an email?{" "}
						<Link
							href="#"
							className="font-medium text-secondary underline hover:text-blue-800"
						>
							Resend link
						</Link>
					</p>
					<Button className="font-medium text-white w-full">
						<Link href="/auth/login">Go to Login</Link>
					</Button>
				</CardContent>
			</Card>
		</AuthLayout>
	);
}
