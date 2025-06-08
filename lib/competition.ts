import { apiRequest } from './api';
import { Competition } from '@/types/competition';

export async function getCompetitions(): Promise<Competition[]> {
  return apiRequest<Competition[]>('/competition/');
}

export async function getCompetition(id: number): Promise<Competition> {
  return apiRequest<Competition>(`/competition/${id}`);
}