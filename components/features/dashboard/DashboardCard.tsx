// components/dashboard/DashboardCard.tsx

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react"; // Impor React untuk mengakses tipe datanya

interface DashboardCardProps {
	title: string;
	description?: string;
	value: string | number;
	icon: React.ElementType;
	className?: string;
}

export function DashboardCard({
	title,
	description,
	value,
	icon: Icon,
	className,
}: DashboardCardProps) {
	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{/* 'Icon' akan dirender sebagai komponen di sini */}
				<Icon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{value}</div>
				{description && (
					<p className="text-xs text-muted-foreground">{description}</p>
				)}
			</CardContent>
		</Card>
	);
}
