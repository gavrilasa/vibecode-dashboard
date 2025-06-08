import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { FullRegistrationFormData } from "./RegistrationForm";

interface MemberFieldsProps {
	index: number;
	control: Control<FullRegistrationFormData>;
	register: UseFormRegister<FullRegistrationFormData>;
	errors: FieldErrors<FullRegistrationFormData>;
	remove: (index: number) => void;
	canRemove: boolean;
}

export function MemberFields({
	index,
	register,
	errors,
	remove,
	canRemove,
}: MemberFieldsProps) {
	return (
		<div className="relative space-y-4 rounded-lg border p-4 pt-8">
			<div className="absolute top-2 flex w-[calc(100%-2rem)] justify-between">
				<p className="font-semibold">
					Member {index + 1} {index === 0 && "(Team Leader)"}
				</p>
				{canRemove && (
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="h-7 w-7"
						onClick={() => remove(index)}
					>
						<Trash2 className="h-4 w-4 text-destructive" />
						<span className="sr-only">Remove member</span>
					</Button>
				)}
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="space-y-2">
					<Label htmlFor={`members.${index}.memberName`}>Full Name</Label>
					<Input {...register(`members.${index}.memberName`)} />
					{errors.members?.[index]?.memberName && (
						<p className="text-sm text-red-500">
							{errors.members[index]?.memberName?.message}
						</p>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor={`members.${index}.memberEmail`}>Email</Label>
					<Input type="email" {...register(`members.${index}.memberEmail`)} />
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
					<Label htmlFor={`members.${index}.memberStudentId`}>Student ID</Label>
					<Input {...register(`members.${index}.memberStudentId`)} />
					{errors.members?.[index]?.memberStudentId && (
						<p className="text-sm text-red-500">
							{errors.members[index]?.memberStudentId?.message}
						</p>
					)}
				</div>
				<div className="space-y-2">
					<Label htmlFor={`members.${index}.memberPhone`}>Phone Number</Label>
					<Input type="tel" {...register(`members.${index}.memberPhone`)} />
					{errors.members?.[index]?.memberPhone && (
						<p className="text-sm text-red-500">
							{errors.members[index]?.memberPhone?.message}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
