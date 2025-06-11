// app/registration/form/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration";
import { useTeam } from "@/hooks/useTeam";
import { useRegistrationFlowStore } from "@/store/registration-flow-store";
import {
	RegistrationForm,
	FullRegistrationFormData,
} from "@/components/features/registration/RegistrationForm";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { APP_ROUTES } from "@/lib/constants";
import { toast } from "sonner";

export default function RegistrationFormPage() {
	const { isAuthenticated } = useAuth();
	const {
		register: registerCompetition,
		loading: registrationLoading,
		error: registrationError,
	} = useRegistration();
	const {
		create: createTeam,
		loading: teamLoading,
		error: teamError,
	} = useTeam();
	const { selectedCompetition } = useRegistrationFlowStore();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isConfirming, setIsConfirming] = useState(false);
	const [formData, setFormData] = useState<FullRegistrationFormData | null>(
		null
	);
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push(APP_ROUTES.LOGIN);
		} else if (!selectedCompetition) {
			router.push(APP_ROUTES.SELECT_COMPETITION);
		}
	}, [isAuthenticated, selectedCompetition, router]);

	// PERBAIKAN 1: Jadikan fungsi ini async untuk memenuhi tipe prop onSubmit
	const handleFormSubmit = async (data: FullRegistrationFormData) => {
		setFormData(data);
		setIsConfirming(true);
	};

	const handleConfirmSubmit = async () => {
		if (!formData || !selectedCompetition) {
			toast.error("An unexpected error occurred. Please try again.");
			setIsConfirming(false);
			return;
		}

		setIsConfirming(false);
		setIsSubmitting(true);
		setError(null);

		try {
			const teamPayload = {
				name: formData.teamName,
				competitionId: selectedCompetition.id,
			};
			await createTeam(teamPayload);

			const registrationPayload = {
				institutionName: formData.institutionName,
				memberCount: formData.members.length,
				memberNames: formData.members.map((m) => m.memberName),
				memberEmails: formData.members.map((m) => m.memberEmail),
				memberStudentIds: formData.members.map((m) => m.memberStudentId),
				memberPhones: formData.members.map((m) => m.memberPhone),
			};
			const result = await registerCompetition(registrationPayload);

			// PERBAIKAN 2: Cek apakah result tidak null untuk memastikan sukses
			if (result !== null) {
				toast.success("Registration successful!");
				router.push(APP_ROUTES.REGISTRATION_SUCCESS);
			} else {
				setError(
					registrationError ||
						"Failed to submit registration details after creating team."
				);
			}
		} catch (err: any) {
			setError(
				err.message ||
					"An unexpected error occurred during the submission process."
			);
			toast.error("Submission Failed", {
				description: "An unexpected error occurred. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (teamError) setError(teamError);
		if (registrationError) setError(registrationError);
	}, [teamError, registrationError]);

	if (!selectedCompetition) {
		return (
			<div className="flex h-screen w-full items-center justify-center bg-background">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	return (
		<>
			<div className="p-4 md:p-24">
				<div className="max-w-4xl mx-auto space-y-6">
					<PageHeader
						title="Complete Your Registration"
						description="Fill in the details for your team to finalize your registration (Step 2 of 2)."
					/>

					<RegistrationForm
						competition={selectedCompetition}
						onSubmit={handleFormSubmit}
						isLoading={isSubmitting || teamLoading || registrationLoading}
						error={error}
					/>
				</div>
			</div>

			<AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Konfirmasi Data Pendaftaran</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah Anda yakin semua data tim dan anggota sudah benar? Data ini
							akan digunakan untuk proses verifikasi.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Batal</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirmSubmit}>
							Ya, Saya Yakin
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
