import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Member } from "@/types/registration";
import { Info, Mail, Phone, Shield, User } from "lucide-react";

interface MemberListProps {
	members: Member[];
	teamName: string;
}

export function MemberList({ members, teamName }: MemberListProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Member Details</CardTitle>
				<CardDescription>
					Information for all members of team &quot;{teamName}&quot;.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{members.map((member, index) => (
					<div key={member.id} className="rounded-lg border p-4 space-y-4">
						<h4 className="font-semibold text-foreground">
							Member {index + 1} {index === 0 ? "(Team Leader)" : ""}
						</h4>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
							<div className="flex items-center space-x-2">
								<User className="h-4 w-4 text-muted-foreground" />
								<span>{member.memberName}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<span>{member.memberEmail}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Phone className="h-4 w-4 text-muted-foreground" />
								<span>{member.memberPhone}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Info className="h-4 w-4 text-muted-foreground" />
								<span>Student ID: {member.memberStudentId}</span>
							</div>
							<div className="flex items-center space-x-2">
								<Shield className="h-4 w-4 text-muted-foreground" />
								<span>Discord: {member.memberDiscordUsername}</span>
							</div>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
