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
import { useRegistration } from "@/hooks/useRegistration";
import { Loader2, Upload, CheckCircle, File } from "lucide-react";
import { DOCUMENT_TYPE } from "@/lib/constants";
import { DocumentUpload } from "@/types/registration";
import { Badge } from "@/components/ui/badge";

interface UploadFormData {
	file: FileList;
}

interface DocumentUploadCardProps {
	title: string;
	description: string;
	documentType: (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE];
	uploadedDocuments: DocumentUpload[];
	className?: string;
}

export function DocumentUploadCard({
	title,
	description,
	documentType,
	uploadedDocuments,
	className,
}: DocumentUploadCardProps) {
	const [success, setSuccess] = useState("");
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

	const onSubmit = async (data: UploadFormData) => {
		if (!data.file || data.file.length === 0) {
			return;
		}
		const file = data.file[0];
		const result = await upload({ file, documentType });

		if (result) {
			setSuccess(`"${result.filename}" uploaded successfully!`);
			reset();
			setTimeout(() => setSuccess(""), 5000);
		}
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
				{existingDocument ? (
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
						<p className="text-sm text-muted-foreground">
							If you need to replace it, please upload a new file below. The
							previous one will be overwritten.
						</p>
					</div>
				) : (
					<Alert>
						<File className="h-4 w-4" />
						<AlertDescription>
							No document of this type has been uploaded yet.
						</AlertDescription>
					</Alert>
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
