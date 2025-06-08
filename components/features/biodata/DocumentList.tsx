import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DocumentUpload } from "@/types/registration";
import { FileText, Upload } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";

interface DocumentListProps {
	documents: DocumentUpload[];
	registrationId: number;
}

export function DocumentList({ documents, registrationId }: DocumentListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center space-x-2">
					<FileText className="h-5 w-5" />
					<span>Uploaded Documents</span>
				</CardTitle>
				<CardDescription>
					Status of your uploaded documents for registration ID #
					{registrationId}
				</CardDescription>
			</CardHeader>
			<CardContent>
				{documents.length > 0 ? (
					<div className="space-y-3">
						{documents.map((doc) => (
							<div
								key={doc.id}
								className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
							>
								<div>
									<p className="font-medium">{doc.filename}</p>
									<p className="text-sm text-gray-500 capitalize">
										{doc.type.toLowerCase()} Document
									</p>
								</div>
								<Badge variant="secondary">{doc.filetype}</Badge>
							</div>
						))}
					</div>
				) : (
					<div className="py-8">
						<EmptyState
							title="No Documents Uploaded"
							description="You haven't uploaded any documents for this competition yet."
						/>
					</div>
				)}

				<div className="mt-6">
					<Button asChild variant="outline">
						<Link href="/dashboard/upload">Upload / Manage Documents</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
