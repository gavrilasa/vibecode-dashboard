// components/dashboard/DashboardCard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
			<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Icon className="w-4 h-4 text-muted-foreground" />
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
