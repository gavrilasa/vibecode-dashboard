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

interface DocumentUploadCardProps {
	title: string;
	description: string;
	documentType: (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE];
	uploadedDocuments: DocumentUpload[];
	className?: string;
	registrationStatus: (typeof REGISTRATION_STATUS)[keyof typeof REGISTRATION_STATUS];
	onFinalSubmit: () => Promise<void>;
}

export function DocumentUploadCard({
	title,
	description,
	documentType,
	uploadedDocuments,
	className,
	registrationStatus,
	onFinalSubmit,
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

	// PERUBAHAN & PERBAIKAN: Logika baru untuk menentukan apakah form terkunci
	const EDITABLE_STATUSES: string[] = [
		REGISTRATION_STATUS.PENDING,
		REGISTRATION_STATUS.REJECTED,
	];
	const isLocked = !EDITABLE_STATUSES.includes(registrationStatus);

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

		const isFinalSubmission =
			(documentType === DOCUMENT_TYPE.VALIDATION && hasSponsorDoc) ||
			(documentType === DOCUMENT_TYPE.SPONSOR && hasValidationDoc);

		// Pop-up hanya muncul jika statusnya bisa diedit (PENDING/REJECTED) dan ini adalah pengajuan final
		if (isFinalSubmission && !isLocked) {
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
		if (uploadSuccess) {
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
								Your registration status is "{registrationStatus}", so this
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
						className="w-full text-white"
						disabled={loading || isLocked}
					>
						{loading ? "Uploading..." : isLocked ? "Locked" : "Upload Document"}
					</Button>
				</form>
			</CardContent>

			<AlertDialog open={isConfirming} onOpenChange={setIsConfirming}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Ajukan Berkas Pendaftaran?</AlertDialogTitle>
						<AlertDialogDescription>
							Dengan mengajukan berkas, semua data biodata dan dokumen yang
							telah diunggah akan dikunci dan tidak dapat diubah lagi. Pastikan
							semua data sudah benar.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setFileToSubmit(null)}>
							Batal
						</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirmSubmit}>
							Ya, Ajukan Berkas
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</Card>
	);
}
