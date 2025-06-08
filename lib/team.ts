// lib/team.ts

import { apiRequest } from "./api";
import { Team, CreateTeamRequest, UpdateTeamRequest } from "@/types/team";

/**
 * Mendapatkan semua tim (HANYA UNTUK ADMIN).
 * Endpoint: GET /team
 */
export async function getAllTeams(): Promise<Team[]> {
	return apiRequest<Team[]>("/team");
}

/**
 * Membuat tim baru.
 * Endpoint: POST /team
 */
export async function createTeam(data: CreateTeamRequest): Promise<Team> {
	return apiRequest<Team>("/team", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

/**
 * Memperbarui data tim.
 * Endpoint: PUT /team/update
 */
export async function updateTeam(data: UpdateTeamRequest): Promise<Team> {
	return apiRequest<Team>("/team/update", {
		method: "PUT",
		body: JSON.stringify(data),
	});
}
