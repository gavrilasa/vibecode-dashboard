export interface Team {
  id: string;
  name: string;
  competitionId?: number;
  competition: {
    id: number;
    name: string;
    description?: string;
    maxMembers: number;
    startDate: string;
    endDate: string;
  };
}

export interface CreateTeamRequest {
  name: string;
  competitionId: number;
}

export interface UpdateTeamRequest {
  name: string;
  competitionId: number;
}