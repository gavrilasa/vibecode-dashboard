import { apiRequest } from './api';
import { Team, CreateTeamRequest, UpdateTeamRequest } from '@/types/team';

export async function getMyTeam(): Promise<Team> {
  return apiRequest<Team>('/team/me');
}

export async function getAllTeams(): Promise<Team[]> {
  return apiRequest<Team[]>('/team');
}

export async function createTeam(data: CreateTeamRequest): Promise<Team> {
  return apiRequest<Team>('/team', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTeam(data: UpdateTeamRequest): Promise<Team> {
  return apiRequest<Team>('/team/update', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}