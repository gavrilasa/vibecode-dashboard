import { cn } from "@/lib/utils";
import React from "react";

interface PageHeaderProps {
	title: string;
	description?: string;
	className?: string;
	children?: React.ReactNode; // Slot untuk elemen tambahan seperti tombol
}

export function PageHeader({
	title,
	description,
	className,
	children,
}: PageHeaderProps) {
	return (
		<div
			className={cn(
				"flex flex-wrap items-center justify-between gap-4",
				className
			)}
		>
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					{title}
				</h1>
				{description && (
					<p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
				)}
			</div>
			{/* "Slot" untuk tombol atau elemen lainnya */}
			{children && <div>{children}</div>}
		</div>
	);
}
