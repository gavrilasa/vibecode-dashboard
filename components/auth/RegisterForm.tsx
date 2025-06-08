"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { register as registerUser } from "@/lib/auth";
import { Loader2 } from "lucide-react";

const registerSchema = z
	.object({
		username: z.string().min(2, "Username must be at least 2 characters"),
		email: z.string().email("Please enter a valid email address"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z
			.string()
			.min(8, "Confirm password must be at least 8 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		setIsLoading(true);
		setError("");
		setSuccess("");

		try {
			// Send all fields including confirmPassword as the API expects it
			await registerUser(data);
			setSuccess("Registration successful! You can now sign in.");
			setTimeout(() => {
				router.push("/auth/login");
			}, 2000);
		} catch (err: any) {
			setError(err.message || "Registration failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="w-full max-w-md">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl font-bold text-center">
					Create account
				</CardTitle>
				<CardDescription className="text-center">
					Enter your details to create your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{error && (
						<Alert variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					{success && (
						<Alert>
							<AlertDescription>{success}</AlertDescription>
						</Alert>
					)}

					<div className="space-y-2">
						<Label htmlFor="username">Username</Label>
						<Input
							id="username"
							type="text"
							placeholder="Enter your username"
							{...register("username")}
							className={errors.username ? "border-red-500" : ""}
						/>
						{errors.username && (
							<p className="text-sm text-red-500">{errors.username.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="Enter your email"
							{...register("email")}
							className={errors.email ? "border-red-500" : ""}
						/>
						{errors.email && (
							<p className="text-sm text-red-500">{errors.email.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							type="password"
							placeholder="Enter your password (min 8 characters)"
							{...register("password")}
							className={errors.password ? "border-red-500" : ""}
						/>
						{errors.password && (
							<p className="text-sm text-red-500">{errors.password.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input
							id="confirmPassword"
							type="password"
							placeholder="Confirm your password"
							{...register("confirmPassword")}
							className={errors.confirmPassword ? "border-red-500" : ""}
						/>
						{errors.confirmPassword && (
							<p className="text-sm text-red-500">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Creating account...
							</>
						) : (
							"Create account"
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
