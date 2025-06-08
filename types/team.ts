// types/team.ts
import { Competition } from "./competition";

/**
 * Merepresentasikan data tim yang didapat dari API.
 */
export interface Team {
	id: string;
	name: string;
	competitionId: number;
	competition: Competition; // Objek competition lengkap
}

/**
 * Tipe data untuk request body saat membuat tim baru.
 */
export interface CreateTeamRequest {
	name: string;
	competitionId: number;
}

/**
 * Tipe data untuk request body saat memperbarui tim.
 */
export interface UpdateTeamRequest {
	name: string;
	competitionId: number;
}
