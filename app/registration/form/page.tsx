// app/registration/form/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuth } from "@/hooks/useAuth";
import { useRegistration } from "@/hooks/useRegistration";
import { useTeam } from "@/hooks/useTeam";
import { useRegistrationFlowStore } from "@/store/registration-flow-store";
import {
	RegistrationForm,
	FullRegistrationFormData,
} from "@/components/registration/RegistrationForm";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
	const { selectedCompetition, clearFlow } = useRegistrationFlowStore();

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState("");
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/auth/login");
		} else if (!selectedCompetition) {
			router.push("/competition/select");
		}
	}, [isAuthenticated, selectedCompetition, router]);

	const handleRegistrationSubmit = async (data: FullRegistrationFormData) => {
		setIsSubmitting(true);
		setError(null);
		setSuccess("");

		if (!selectedCompetition) {
			setError("Competition not selected. Please go back.");
			setIsSubmitting(false);
			return;
		}

		try {
			// Step 1: Create the team
			const teamPayload = {
				name: data.teamName,
				competitionId: selectedCompetition.id,
			};
			await createTeam(teamPayload);

			// Step 2: Register the team with member details
			// PERBAIKAN: Payload disesuaikan persis dengan dokumentasi API
			// Tidak ada lagi `competitionId` di sini.
			const registrationPayload = {
				institutionName: data.institutionName,
				memberCount: data.members.length,
				memberNames: data.members.map((m) => m.memberName),
				memberEmails: data.members.map((m) => m.memberEmail),
				memberDiscordUsernames: data.members.map(
					(m) => m.memberDiscordUsername
				),
				memberStudentIds: data.members.map((m) => m.memberStudentId),
				memberPhones: data.members.map((m) => m.memberPhone),
			};
			const result = await registerCompetition(registrationPayload);

			if (result) {
				setSuccess(
					"Registration submitted successfully! You will be redirected to the dashboard."
				);
				clearFlow();
				setTimeout(() => {
					router.push("/dashboard");
				}, 3000);
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
		<AppLayout>
			<div className="max-w-4xl mx-auto space-y-6">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Complete Your Registration
					</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Fill in the details for your team to finalize your registration
						(Step 2 of 2).
					</p>
				</div>

				{success && (
					<Alert variant="default" className="bg-green-50 border-green-200">
						<AlertTitle className="text-green-800">Success!</AlertTitle>
						<AlertDescription className="text-green-700">
							{success}
						</AlertDescription>
					</Alert>
				)}

				<RegistrationForm
					competition={selectedCompetition}
					onSubmit={handleRegistrationSubmit}
					isLoading={isSubmitting || teamLoading || registrationLoading}
					error={error}
				/>
			</div>
		</AppLayout>
	);
}
