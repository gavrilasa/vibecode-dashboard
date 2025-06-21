// components/common/StatusBadge.tsx
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status =
	| "PENDING"
	| "REVIEW"
	| "APPROVED"
	| "REJECTED"
	| "PRELIMINARY"
	| "FINAL"
	| "ELIMINATED"
	| string;

interface StatusBadgeProps {
	status: Status;
	className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
	const baseClasses = "text-white hover:text-white text-sm";
	let statusClass = "";
	let statusText = status;

	switch (status) {
		case "APPROVED":
			statusClass = "bg-green-600 hover:bg-green-700";
			statusText = "Approved";
			break;
		case "PENDING":
			statusClass = "bg-yellow-500 hover:bg-yellow-600";
			statusText = "Pending";
			break;
		case "REVIEW":
			statusClass = "bg-slate-600 hover:bg-slate-700";
			statusText = "Review";
			break;
		case "REJECTED":
			statusClass = "bg-red-600 hover:bg-red-700";
			statusText = "Rejected";
			break;
		case "PRELIMINARY":
			statusClass = "bg-blue-600 hover:bg-blue-700";
			statusText = "Preliminary";
			break;
		case "FINAL":
			statusClass = "bg-purple-600 hover:bg-purple-700";
			statusText = "Final";
			break;
		case "ELIMINATED":
			statusClass = "bg-red-600 hover:bg-red-700";
			statusText = "Eliminated";
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
