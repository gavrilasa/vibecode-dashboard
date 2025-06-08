import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Competition } from "@/types/competition";
import { GraduationCap, Trophy, Users } from "lucide-react";

import { RegistrationDetails } from "@/types/registration";
import { Team } from "@/types/team";

interface TeamInfoCardProps {
	team: Omit<Team, "competition">;
	competition: Omit<Competition, "batches">;
	details: RegistrationDetails;
}

export function TeamInfoCard({
	team,
	competition,
	details,
}: TeamInfoCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center space-x-2">
					<Users className="h-5 w-5" />
					<span>Team & Competition Details</span>
				</CardTitle>
				<CardDescription>
					Your team is registered for the {competition.name}.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<div className="flex items-start space-x-3">
					<Users className="h-5 w-5 mt-1 text-muted-foreground" />
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Team Name
						</p>
						<p className="text-lg font-semibold">{team.name}</p>
					</div>
				</div>
				<div className="flex items-start space-x-3">
					<Trophy className="h-5 w-5 mt-1 text-muted-foreground" />
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Competition
						</p>
						<p className="text-lg font-semibold">{competition.name}</p>
					</div>
				</div>
				<div className="flex items-start space-x-3">
					<GraduationCap className="h-5 w-5 mt-1 text-muted-foreground" />
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Institution
						</p>
						<p className="text-lg font-semibold">{details.institutionName}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
