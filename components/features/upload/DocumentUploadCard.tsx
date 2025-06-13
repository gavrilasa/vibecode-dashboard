// components/features/upload/DocumentUploadCard.tsx

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { useRegistration } from "@/hooks/useRegistration";
import { Loader2, Upload, CheckCircle, File } from "lucide-react";
import { DOCUMENT_TYPE, REGISTRATION_STATUS } from "@/lib/constants";
import { DocumentUpload } from "@/types/registration";

interface UploadFormData {
	file: FileList;
}

// PERUBAHAN: Menambahkan props untuk kustomisasi pop-up
interface DocumentUploadCardProps {
	title: string;
	description: string;
	documentType: (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE];
	uploadedDocuments: DocumentUpload[];
	className?: string;
	allowedStatuses?: (typeof REGISTRATION_STATUS)[keyof typeof REGISTRATION_STATUS][];
	registrationStatus: (typeof REGISTRATION_STATUS)[keyof typeof REGISTRATION_STATUS];
	onFinalSubmit?: () => Promise<void>; // Dibuat opsional
	confirmEveryTime?: boolean; // Prop baru untuk memicu konfirmasi setiap saat
	confirmationText?: {
		// Prop baru untuk teks pop-up
		title: string;
		description: string;
		action: string;
	};
}

export function DocumentUploadCard({
	title,
	description,
	documentType,
	uploadedDocuments,
	className,
	allowedStatuses,
	registrationStatus,
	onFinalSubmit,
	confirmEveryTime = false,
	confirmationText,
}: DocumentUploadCardProps) {
	const [success, setSuccess] = useState("");
	const [isConfirming, setIsConfirming] = useState(false);
	const [fileToSubmit, setFileToSubmit] = useState<File | null>(null);

	const { upload, loading, error } = useRegistration();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UploadFormData>();

	const existingDocument = uploadedDocuments.find(
		(doc) => doc.type === documentType
	);

	const defaultEditableStatuses: string[] = [
		REGISTRATION_STATUS.PENDING,
		REGISTRATION_STATUS.REJECTED,
	];

	// Gunakan allowedStatuses dari props jika ada, jika tidak gunakan default.
	const editableStatuses = allowedStatuses || defaultEditableStatuses;
	const isLocked = !editableStatuses.includes(registrationStatus);

	const defaultConfirmationText = {
		title: "Ajukan Berkas Pendaftaran?",
		description:
			"Dengan mengajukan berkas, semua data biodata dan dokumen yang telah diunggah akan dikunci. Pastikan semua data sudah benar.",
		action: "Ya, Ajukan Berkas",
	};

	const currentConfirmationText = confirmationText || defaultConfirmationText;

	const onSubmit = async (data: UploadFormData) => {
		if (!data.file || data.file.length === 0) return;

		const file = data.file[0];
		setFileToSubmit(file);

		const hasValidationDoc = uploadedDocuments.some(
			(d) => d.type === DOCUMENT_TYPE.VALIDATION
		);
		const hasSponsorDoc = uploadedDocuments.some(
			(d) => d.type === DOCUMENT_TYPE.SPONSOR
		);

		const isFinalSubmissionTrigger =
			(documentType === DOCUMENT_TYPE.VALIDATION && hasSponsorDoc) ||
			(documentType === DOCUMENT_TYPE.SPONSOR && hasValidationDoc);

		// PERUBAHAN: Logika untuk menampilkan pop-up
		if (confirmEveryTime || isFinalSubmissionTrigger) {
			setIsConfirming(true);
		} else {
			await handleUpload(file);
		}
	};

	const handleUpload = async (file: File) => {
		const result = await upload({ file, documentType });
		if (result) {
			setSuccess(`"${result.filename}" uploaded successfully!`);
			reset();
			setTimeout(() => setSuccess(""), 5000);
			return true;
		}
		return false;
	};

	const handleConfirmSubmit = async () => {
		if (!fileToSubmit) return;
		setIsConfirming(false);
		const uploadSuccess = await handleUpload(fileToSubmit);

		// PERUBAHAN: onFinalSubmit hanya dipanggil jika bukan konfirmasi setiap saat
		if (uploadSuccess && onFinalSubmit && !confirmEveryTime) {
			await onFinalSubmit();
		}
		setFileToSubmit(null);
	};

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle className="flex items-center space-x-2">
					<Upload className="h-5 w-5" />
					<span>{title}</span>
				</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				{existingDocument && (
					<div className="space-y-3">
						<Alert variant="default" className="border-green-500">
							<CheckCircle className="h-4 w-4 !text-green-500" />
							<AlertDescription>
								You have already uploaded this document:
								<p className="font-semibold break-all">
									{existingDocument.filename}
								</p>
							</AlertDescription>
						</Alert>
						{isLocked && (
							<p className="text-sm text-yellow-600">
								Your registration status is {registrationStatus}, so this
								document cannot be changed.
							</p>
						)}
					</div>
				)}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
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
						<Label htmlFor={`file-${documentType}`}>
							File (PDF only, max 10MB)
						</Label>
						<Input
							id={`file-${documentType}`}
							type="file"
							accept=".pdf"
							disabled={loading || isLocked}
							{...register("file", {
								required: "Please select a file to upload",
								validate: {
									fileType: (files) =>
										files?.[0]?.type === "application/pdf" ||
										"Only PDF files are allowed",
									fileSize: (files) =>
										files?.[0]?.size <= 10 * 1024 * 1024 ||
										"File size must be less than 10MB",
								},
							})}
							className={errors.file ? "border-red-500" : ""}
						/>
						{errors.file && (
							<p className="text-sm text-red-500">{errors.file.message}</p>
						)}
					</div>
					<Button
						type="submit"
						className="w-full text-white disabled:bg-gray-400"
						disabled={loading || isLocked}
					>
						{loading ? "Uploading..." : isLocked ? "Locked" : "Upload Document"}
					</Button>
				</form>
			</CardContent>
			<AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
				<AlertDialogContent>
					<AlertDialogHeader>
						{/* PERUBAHAN: Teks pop-up dinamis */}
						<AlertDialogTitle>{currentConfirmationText.title}</AlertDialogTitle>
						<AlertDialogDescription>
							{currentConfirmationText.description}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setFileToSubmit(null)}>
							Batal
						</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirmSubmit}>
							{currentConfirmationText.action}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Card>
	);
}
