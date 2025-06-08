// hooks/useTeam.ts

"use client";

import { useState, useCallback } from "react";
// Hapus import getMyTeam karena sudah tidak ada
import { createTeam, updateTeam } from "@/lib/team";
import { Team, CreateTeamRequest, UpdateTeamRequest } from "@/types/team";

export function useTeam() {
	// State untuk team tidak lagi dikelola di sini
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Hapus fungsi fetchMyTeam

	const create = useCallback(
		async (data: CreateTeamRequest): Promise<Team | null> => {
			setLoading(true);
			setError(null);
			try {
				const newTeam = await createTeam(data);
				// State tidak di-set di sini, halaman yang akan me-refresh data utamanya
				return newTeam;
			} catch (err: any) {
				setError(err.message || "Failed to create team");
				return null;
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	const update = useCallback(
		async (data: UpdateTeamRequest): Promise<Team | null> => {
			setLoading(true);
			setError(null);
			try {
				// Fungsi updateTeam dari lib hanya mengembalikan data parsial
				const updatedTeamPartial = await updateTeam(data);
				// Halaman yang memanggil fungsi ini bertanggung jawab untuk refresh data lengkap
				return updatedTeamPartial;
			} catch (err: any) {
				setError(err.message || "Failed to update team");
				return null;
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return {
		loading,
		error,
		create,
		update,
	};
}
