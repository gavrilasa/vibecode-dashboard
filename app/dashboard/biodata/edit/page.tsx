// app/dashboard/biodata/edit/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration";
import { updateRegistration } from "@/lib/registration";
import { Loader2, ArrowLeft, Users, PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { PageLoader } from "@/components/common/PageLoader";
import { toast } from "sonner";
import {
	APP_ROUTES,
	COMPETITION_KEYS,
	REGISTRATION_STATUS,
} from "@/lib/constants";

// Skema Zod tidak berubah
const memberSchema = z.object({
	memberName: z.string().min(2, "Name is required."),
	memberEmail: z.string().email("Invalid email address."),
	memberStudentId: z.string().min(5, "Student ID is required."),
	memberPhone: z.string().min(10, "Phone number is required."),
});

const editBiodataSchema = z.object({
	institutionName: z.string().min(3, "Institution name is required."),
	members: z.array(memberSchema),
});

type EditBiodataFormData = z.infer<typeof editBiodataSchema>;

const EDITABLE_STATUSES: string[] = [
	REGISTRATION_STATUS.PENDING,
	REGISTRATION_STATUS.REJECTED,
];

export default function EditBiodataPage() {
	const { isAuthenticated } = useAuth();
	const { registrations, loading, fetchMyRegistrations } = useRegistration();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	// PERUBAHAN & PERBAIKAN: Mendefinisikan status mana saja yang BOLEH mengedit.

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm<EditBiodataFormData>({
		resolver: zodResolver(editBiodataSchema),
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "members",
	});

	useEffect(() => {
		if (isAuthenticated) {
			fetchMyRegistrations();
		}
	}, [isAuthenticated, fetchMyRegistrations]);

	useEffect(() => {
		if (registrations && registrations.length > 0) {
			const reg = registrations[0];

			// PERUBAHAN & PERBAIKAN: Logika dibalik, redirect jika status TIDAK TERMASUK dalam EDITABLE_STATUSES
			if (!EDITABLE_STATUSES.includes(reg.status)) {
				toast.info("Cannot Edit Biodata", {
					description: `Your registration status is "${reg.status}", which cannot be edited.`,
				});
				router.push("/dashboard/biodata");
				return;
			}

			reset({
				institutionName: reg.details.institutionName,
				members: reg.details.members.map((m) => ({
					memberName: m.memberName,
					memberEmail: m.memberEmail,
					memberStudentId: m.memberStudentId,
					memberPhone: m.memberPhone,
				})),
			});
		}
	}, [registrations, reset, router]);

	const onSubmit = async (data: EditBiodataFormData) => {
		setIsSubmitting(true);
		try {
			const payload = {
				institutionName: data.institutionName,
				memberCount: data.members.length,
				memberNames: data.members.map((m) => m.memberName),
				memberEmails: data.members.map((m) => m.memberEmail),
				memberStudentIds: data.members.map((m) => m.memberStudentId),
				memberPhones: data.members.map((m) => m.memberPhone),
			};

			await updateRegistration(payload);
			toast.success("Biodata updated successfully!");
			fetchMyRegistrations();
			router.push("/dashboard/biodata");
		} catch (error: any) {
			toast.error("Failed to update biodata", {
				description: error.message || "An unexpected error occurred.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	if (loading || !registrations || registrations.length === 0) {
		return <PageLoader />;
	}

	const { team, competition } = registrations[0];

	const getMemberRules = () => {
		const name = competition.name.toLowerCase();
		if (name.includes(COMPETITION_KEYS.CTF)) return { min: 1, max: 3 };
		if (name.includes(COMPETITION_KEYS.FTL)) return { min: 2, max: 2 };
		return { min: 2, max: 3 };
	};
	const memberRules = getMemberRules();

	return (
		<div className="space-y-6">
			<PageHeader
				title="Edit Biodata"
				description={`Update your team and member information for ${competition.name}.`}
			>
				<Button variant="outline" asChild>
					<Link href="/dashboard/biodata">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Cancel
					</Link>
				</Button>
			</PageHeader>
			<Card>
				<CardHeader>
					<CardTitle>Team: {team.name}</CardTitle>
					<CardDescription>
						The team name cannot be changed. For other changes, please contact
						the committee.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* ... Sisa dari form tidak ada perubahan ... */}
						<div>
							<Label htmlFor="institutionName">Institution / University</Label>
							<Input
								id="institutionName"
								{...register("institutionName")}
								className={errors.institutionName ? "border-destructive" : ""}
							/>
							{errors.institutionName && (
								<p className="text-sm text-destructive mt-1">
									{errors.institutionName.message}
								</p>
							)}
						</div>
						<Separator />
						<div className="flex items-center gap-2">
							<Users className="h-5 w-5 text-muted-foreground" />
							<h3 className="text-lg font-semibold">Member Details</h3>
						</div>
						<div className="space-y-6">
							{fields.map((field, index) => (
								<div
									key={field.id}
									className="relative space-y-4 rounded-lg border p-4 pt-8"
								>
									<div className="absolute top-2 flex w-[calc(100%-2rem)] justify-between">
										<p className="font-semibold">
											Member {index + 1} {index === 0 && "(Team Leader)"}
										</p>
										{fields.length > memberRules.min && (
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="h-7 w-7"
												onClick={() => remove(index)}
											>
												<Trash2 className="h-4 w-4 text-destructive" />
											</Button>
										)}
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-1">
											<Label htmlFor={`members.${index}.memberName`}>
												Full Name
											</Label>
											<Input {...register(`members.${index}.memberName`)} />
											{errors.members?.[index]?.memberName && (
												<p className="text-sm text-destructive">
													{errors.members[index]?.memberName?.message}
												</p>
											)}
										</div>
										<div className="space-y-1">
											<Label htmlFor={`members.${index}.memberEmail`}>
												Email
											</Label>
											<Input
												type="email"
												{...register(`members.${index}.memberEmail`)}
											/>
											{errors.members?.[index]?.memberEmail && (
												<p className="text-sm text-destructive">
													{errors.members[index]?.memberEmail?.message}
												</p>
											)}
										</div>
										<div className="space-y-1">
											<Label htmlFor={`members.${index}.memberStudentId`}>
												Student ID
											</Label>
											<Input
												{...register(`members.${index}.memberStudentId`)}
											/>
											{errors.members?.[index]?.memberStudentId && (
												<p className="text-sm text-destructive">
													{errors.members[index]?.memberStudentId?.message}
												</p>
											)}
										</div>
										<div className="space-y-1">
											<Label htmlFor={`members.${index}.memberPhone`}>
												Phone Number
											</Label>
											<Input
												type="tel"
												{...register(`members.${index}.memberPhone`)}
											/>
											{errors.members?.[index]?.memberPhone && (
												<p className="text-sm text-destructive">
													{errors.members[index]?.memberPhone?.message}
												</p>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
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
								Add Member
							</Button>
						)}
						<Button
							type="submit"
							className="w-full"
							disabled={isSubmitting || !isDirty}
						>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
								</>
							) : (
								"Save Changes"
							)}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
