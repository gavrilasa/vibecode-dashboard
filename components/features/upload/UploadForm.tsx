// components/upload/UploadForm.tsx

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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRegistration } from "@/hooks/useRegistration";
import { Loader2, Upload } from "lucide-react";
import { DOCUMENT_TYPE, COMPETITION_KEYS } from "@/lib/constants";

interface UploadFormData {
	file: FileList;
}

interface UploadFormProps {
	competitionName?: string;
}

export function UploadForm({ competitionName }: UploadFormProps) {
	const [documentType, setDocumentType] = useState<
		(typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE]
	>(DOCUMENT_TYPE.VALIDATION);
	const [success, setSuccess] = useState("");
	const { upload, loading, error } = useRegistration();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UploadFormData>();

	const onSubmit = async (data: UploadFormData) => {
		if (!data.file || data.file.length === 0) {
			return;
		}

		const file = data.file[0];

		// ================== PERBAIKAN DI SINI ==================
		// Panggil fungsi `upload` dengan satu objek sebagai argumen
		const result = await upload({ file, documentType });
		// =======================================================

		if (result) {
			setSuccess("Document uploaded successfully!");
			reset();
			setTimeout(() => setSuccess(""), 3000);
		}
	};

	const isUIUXCompetition = competitionName
		?.toLowerCase()
		.includes(COMPETITION_KEYS.UI_UX);

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle className="flex items-center space-x-2">
					<Upload className="h-5 w-5" />
					<span>Upload Document</span>
				</CardTitle>
				<CardDescription>
					Upload your required documents for the competition
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
						<Label htmlFor="documentType">Document Type</Label>
						<Select
							value={documentType}
							onValueChange={(value: any) => setDocumentType(value)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select document type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={DOCUMENT_TYPE.VALIDATION}>
									Validation Document
								</SelectItem>
								{isUIUXCompetition && (
									<>
										<SelectItem value={DOCUMENT_TYPE.PRELIMINARY}>
											Penyisihan Submission
										</SelectItem>
										<SelectItem value={DOCUMENT_TYPE.FINAL}>
											Final Submission
										</SelectItem>
									</>
								)}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="file">File (PDF only)</Label>
						<Input
							id="file"
							type="file"
							accept=".pdf"
							{...register("file", {
								required: "Please select a file to upload",
								validate: {
									fileType: (files) => {
										if (!files || files.length === 0) return true;
										const file = files[0];
										return (
											file.type === "application/pdf" ||
											"Only PDF files are allowed"
										);
									},
									fileSize: (files) => {
										if (!files || files.length === 0) return true;
										const file = files[0];
										return (
											file.size <= 10 * 1024 * 1024 ||
											"File size must be less than 10MB"
										);
									},
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
						disabled={loading}
					>
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Uploading...
							</>
						) : (
							"Upload Document"
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
