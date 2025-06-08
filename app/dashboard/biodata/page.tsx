"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import {
	User,
	Mail,
	Phone,
	MapPin,
	GraduationCap,
	Edit,
	FileText,
} from "lucide-react";
import Link from "next/link";

export default function BiodataPage() {
	const { isAuthenticated, user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/auth/login");
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated) {
		return null;
	}

	// Mock biodata (in real app, fetch from API)
	const biodata = {
		fullName: user?.username || "John Doe",
		email: user?.email || "john@example.com",
		phone: "+62 812 3456 7890",
		university: "Universitas Diponegoro",
		major: "Computer Science",
		studentId: "21120121130001",
		address: "Jl. Prof. Soedarto No.13, Tembalang, Semarang, Jawa Tengah 50275",
		emergencyContact: "+62 812 9876 5432",
		motivation:
			"I am passionate about technology and innovation. Participating in this competition will help me develop my skills and network with like-minded individuals.",
		documents: [
			{ name: "Student ID Card", status: "uploaded", type: "VALIDATION" },
			{ name: "Transcript", status: "pending", type: "VALIDATION" },
		],
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "uploaded":
				return <Badge className="bg-green-100 text-green-800">Uploaded</Badge>;
			case "pending":
				return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
			case "rejected":
				return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
			default:
				return <Badge variant="secondary">Not Uploaded</Badge>;
		}
	};

	return (
		<AppLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							My Biodata
						</h1>
						<p className="mt-2 text-gray-600 dark:text-gray-400">
							View and manage your personal information
						</p>
					</div>
					<Button asChild>
						<Link href="/dashboard/biodata/edit">
							<Edit className="mr-2 h-4 w-4" />
							Edit Biodata
						</Link>
					</Button>
				</div>

				{/* Personal Information */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<User className="h-5 w-5" />
							<span>Personal Information</span>
						</CardTitle>
						<CardDescription>Your basic personal details</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									<User className="h-5 w-5 text-gray-400" />
									<div>
										<p className="text-sm font-medium text-gray-500">
											Full Name
										</p>
										<p className="text-lg font-semibold">{biodata.fullName}</p>
									</div>
								</div>

								<div className="flex items-center space-x-3">
									<Mail className="h-5 w-5 text-gray-400" />
									<div>
										<p className="text-sm font-medium text-gray-500">Email</p>
										<p className="text-lg font-semibold">{biodata.email}</p>
									</div>
								</div>

								<div className="flex items-center space-x-3">
									<Phone className="h-5 w-5 text-gray-400" />
									<div>
										<p className="text-sm font-medium text-gray-500">
											Phone Number
										</p>
										<p className="text-lg font-semibold">{biodata.phone}</p>
									</div>
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									<GraduationCap className="h-5 w-5 text-gray-400" />
									<div>
										<p className="text-sm font-medium text-gray-500">
											University
										</p>
										<p className="text-lg font-semibold">
											{biodata.university}
										</p>
									</div>
								</div>

								<div className="flex items-center space-x-3">
									<GraduationCap className="h-5 w-5 text-gray-400" />
									<div>
										<p className="text-sm font-medium text-gray-500">Major</p>
										<p className="text-lg font-semibold">{biodata.major}</p>
									</div>
								</div>

								<div className="flex items-center space-x-3">
									<FileText className="h-5 w-5 text-gray-400" />
									<div>
										<p className="text-sm font-medium text-gray-500">
											Student ID
										</p>
										<p className="text-lg font-semibold">{biodata.studentId}</p>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Address & Emergency Contact */}
				<div className="grid gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<MapPin className="h-5 w-5" />
								<span>Address</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-900 dark:text-white">{biodata.address}</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center space-x-2">
								<Phone className="h-5 w-5" />
								<span>Emergency Contact</span>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-gray-900 dark:text-white">
								{biodata.emergencyContact}
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Motivation */}
				<Card>
					<CardHeader>
						<CardTitle>Motivation</CardTitle>
						<CardDescription>
							Why you want to participate in this competition
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-gray-900 dark:text-white leading-relaxed">
							{biodata.motivation}
						</p>
					</CardContent>
				</Card>

				{/* Documents Status */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<FileText className="h-5 w-5" />
							<span>Document Status</span>
						</CardTitle>
						<CardDescription>Status of your uploaded documents</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{biodata.documents.map((doc, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
								>
									<div>
										<p className="font-medium">{doc.name}</p>
										<p className="text-sm text-gray-500">Type: {doc.type}</p>
									</div>
									{getStatusBadge(doc.status)}
								</div>
							))}
						</div>

						<div className="mt-4">
							<Button asChild variant="outline">
								<Link href="/dashboard/upload">Upload More Documents</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</AppLayout>
	);
}
