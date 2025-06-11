// components/features/registration/RegistrationForm.tsx

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
import { MemberFields } from "./MemberFields";

// Skema validasi diperbarui: memberDiscordUsername dihapus
const memberSchema = z.object({
	memberName: z.string().min(2, "Name is required."),
	memberEmail: z.string().email("Invalid email address."),
	memberStudentId: z.string().min(5, "Student ID is required."),
	memberPhone: z.string().min(10, "Phone number is required."),
});

const registrationFormSchema = z.object({
	teamName: z.string().min(3, "Team name must be at least 3 characters."),
	institutionName: z.string().min(3, "Institution name is required."),
	members: z.array(memberSchema),
});

export type FullRegistrationFormData = z.infer<typeof registrationFormSchema>;

interface RegistrationFormProps {
	competition: Competition;
	onSubmit: (data: FullRegistrationFormData) => Promise<void>;
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
		if (name.includes("ctf")) return { min: 1, max: 3 };
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
					You are registering for the{" "}
					<span className="font-semibold">{competition.name}</span>. Please fill
					in your team details below.
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
						<MemberFields
							key={field.id}
							index={index}
							control={control}
							register={register}
							errors={errors}
							remove={remove}
							canRemove={fields.length > memberRules.min}
						/>
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
									memberStudentId: "",
									memberPhone: "",
								})
							}
						>
							<PlusCircle className="mr-2 h-4 w-4" />
							Add Another Member
						</Button>
					)}

					<Button
						type="submit"
						className="w-full text-white"
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
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
