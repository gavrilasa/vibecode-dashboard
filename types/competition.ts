export interface Competition {
	id: number;
	name: string;
	description: string;
	maxMembers: number;
	startDate: string;
	endDate: string;
	batches: Batch[];
}

export interface Batch {
	id: number;
	competitionId: number;
	name: string;
	price: string;
	startDate: string;
	endDate: string;
}
