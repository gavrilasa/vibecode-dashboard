import { cn } from "@/lib/utils";
import React from "react";

interface PageHeaderProps {
	title: string;
	description?: string;
	className?: string;
	children?: React.ReactNode;
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
				<h1 className="text-3xl font-bold text-primary dark:text-white">
					{title}
				</h1>
				{description && (
					<p className="mt-2 text-secondary dark:text-gray-400">
						{description}
					</p>
				)}
			</div>
			{children && <div>{children}</div>}
		</div>
	);
}
