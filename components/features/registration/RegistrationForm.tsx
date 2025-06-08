// components/registration/RegistrationForm.tsx

"use client";

import { useForm, useFieldArray } from "react-hook-form";
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
import { Separator } from "@/components/ui/separator";
import { Loader2, PlusCircle, Trash2, Users } from "lucide-react";
import { Competition } from "@/types/competition";

// Skema validasi disesuaikan dengan semua data yang dibutuhkan di form
const memberSchema = z.object({
	memberName: z.string().min(2, "Name is required."),
	memberEmail: z.string().email("Invalid email address."),
	memberDiscordUsername: z.string().min(2, "Discord username is required."),
	memberStudentId: z.string().min(5, "Student ID is required."),
	memberPhone: z.string().min(10, "Phone number is required."),
});

const registrationFormSchema = z.object({
	teamName: z.string().min(3, "Team name must be at least 3 characters."), // Tambahan field nama tim
	institutionName: z.string().min(3, "Institution name is required."),
	members: z.array(memberSchema),
});

// Tipe data ini sekarang merepresentasikan semua data dari form
export type FullRegistrationFormData = z.infer<typeof registrationFormSchema>;

interface RegistrationFormProps {
	competition: Competition;
	onSubmit: (data: FullRegistrationFormData) => Promise<void>; // Prop onSubmit akan menerima semua data form
	isLoading: boolean;
	error: string | null;
}

export function RegistrationForm({
	competition,
	onSubmit,
	isLoading,
	error,
}: RegistrationFormProps) {
	const getMemberRules = () => {
		const name = competition.name.toLowerCase();
		if (name.includes("ctf")) return { min: 3, max: 3 };
		if (name.includes("ftl")) return { min: 2, max: 2 };
		return { min: 2, max: 3 };
	};

	const memberRules = getMemberRules();

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FullRegistrationFormData>({
		resolver: zodResolver(registrationFormSchema),
		defaultValues: {
			teamName: "",
			institutionName: "",
			members: Array.from({ length: memberRules.min }, () => ({
				memberName: "",
				memberEmail: "",
				memberDiscordUsername: "",
				memberStudentId: "",
				memberPhone: "",
			})),
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "members",
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Team and Member Information</CardTitle>
				<CardDescription>
					You are registering for the **{competition.name}**. Please fill in
					your team details below.
					<br />
					<span className="font-semibold text-primary">
						Team Size:{" "}
						{memberRules.min === memberRules.max
							? `Exactly ${memberRules.min}`
							: `Minimum ${memberRules.min}, Maximum ${memberRules.max}`}{" "}
						members.
					</span>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{error && (
						<Alert variant="destructive">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}

					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="teamName">Team Name</Label>
							<Input
								id="teamName"
								{...register("teamName")}
								className={errors.teamName ? "border-red-500" : ""}
								placeholder="Enter your cool team name"
							/>
							{errors.teamName && (
								<p className="text-sm text-red-500">
									{errors.teamName.message}
								</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="institutionName">
								Institution / University Name
							</Label>
							<Input
								id="institutionName"
								{...register("institutionName")}
								className={errors.institutionName ? "border-red-500" : ""}
								placeholder="e.g., Universitas Diponegoro"
							/>
							{errors.institutionName && (
								<p className="text-sm text-red-500">
									{errors.institutionName.message}
								</p>
							)}
						</div>
					</div>

					<Separator />

					<div className="flex items-center gap-2">
						<Users className="h-5 w-5 text-muted-foreground" />
						<h3 className="text-lg font-semibold">Member Details</h3>
					</div>

					{fields.map((field, index) => (
						<div
							key={field.id}
							className="space-y-4 rounded-lg border p-4 relative pt-8"
						>
							<div className="flex justify-between items-center absolute top-2 right-2">
								{fields.length > memberRules.min && (
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={() => remove(index)}
									>
										<Trash2 className="h-4 w-4 text-destructive" />
									</Button>
								)}
							</div>
							<p className="font-semibold absolute top-2 left-4">
								Member {index + 1} {index === 0 && "(Team Leader)"}
							</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor={`members.${index}.memberName`}>
										Full Name
									</Label>
									<Input {...register(`members.${index}.memberName`)} />
									{errors.members?.[index]?.memberName && (
										<p className="text-sm text-red-500">
											{errors.members[index]?.memberName?.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor={`members.${index}.memberEmail`}>Email</Label>
									<Input
										type="email"
										{...register(`members.${index}.memberEmail`)}
									/>
									{errors.members?.[index]?.memberEmail && (
										<p className="text-sm text-red-500">
											{errors.members[index]?.memberEmail?.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor={`members.${index}.memberDiscordUsername`}>
										Discord Username
									</Label>
									<Input
										{...register(`members.${index}.memberDiscordUsername`)}
										placeholder="e.g., user#1234"
									/>
									{errors.members?.[index]?.memberDiscordUsername && (
										<p className="text-sm text-red-500">
											{errors.members[index]?.memberDiscordUsername?.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor={`members.${index}.memberStudentId`}>
										Student ID
									</Label>
									<Input {...register(`members.${index}.memberStudentId`)} />
									{errors.members?.[index]?.memberStudentId && (
										<p className="text-sm text-red-500">
											{errors.members[index]?.memberStudentId?.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor={`members.${index}.memberPhone`}>
										Phone Number
									</Label>
									<Input
										type="tel"
										{...register(`members.${index}.memberPhone`)}
									/>
									{errors.members?.[index]?.memberPhone && (
										<p className="text-sm text-red-500">
											{errors.members[index]?.memberPhone?.message}
										</p>
									)}
								</div>
							</div>
						</div>
					))}

					{fields.length < memberRules.max && (
						<Button
							type="button"
							variant="outline"
							className="w-full"
							onClick={() =>
								append({
									memberName: "",
									memberEmail: "",
									memberDiscordUsername: "",
									memberStudentId: "",
									memberPhone: "",
								})
							}
						>
							<PlusCircle className="mr-2 h-4 w-4" />
							Add Another Member
						</Button>
					)}

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Submitting Registration...
							</>
						) : (
							"Submit Registration"
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
