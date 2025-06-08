import { cn } from "@/lib/utils";
import { FileX2 } from "lucide-react";
import React from "react";

interface EmptyStateProps {
	icon?: React.ElementType;
	title: string;
	description: string;
	className?: string;
}

export function EmptyState({
	icon: Icon = FileX2,
	title,
	description,
	className,
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center space-y-4 text-center text-muted-foreground",
				className
			)}
		>
			<Icon className="h-12 w-12" />
			<div className="space-y-1">
				<p className="text-lg font-semibold text-foreground">{title}</p>
				<p className="text-sm">{description}</p>
			</div>
		</div>
	);
}
