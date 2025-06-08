import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "PENDING" | "APPROVED" | "REJECTED" | string;

interface StatusBadgeProps {
	status: Status;
	className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
	const baseClasses = "text-white hover:text-white";
	let statusClass = "";
	let statusText = "Unknown";

	switch (status) {
		case "APPROVED":
			statusClass = "bg-green-600 hover:bg-green-700";
			statusText = "Approved";
			break;
		case "PENDING":
			statusClass = "bg-yellow-500 hover:bg-yellow-600";
			statusText = "Pending";
			break;
		case "REJECTED":
			statusClass = "bg-red-600 hover:bg-red-700";
			statusText = "Rejected";
			break;
		default:
			statusClass = "bg-gray-500 hover:bg-gray-600";
			break;
	}

	return (
		<Badge className={cn(baseClasses, statusClass, className)}>
			{statusText}
		</Badge>
	);
}
