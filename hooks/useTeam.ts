// hooks/useTeam.ts
"use client";

import { useState, useCallback } from "react";
import { createTeam, updateTeam } from "@/lib/team";
import { Team, CreateTeamRequest, UpdateTeamRequest } from "@/types/team";

// NOTE: Hook ini juga tidak menggunakan useApi karena tujuannya adalah
// untuk melakukan aksi (create/update) dan bukan menyimpan data team.
// Interface aslinya lebih fokus pada state loading dan error dari aksi tersebut.
export function useTeam() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const create = useCallback(
		async (data: CreateTeamRequest): Promise<Team | null> => {
			setLoading(true);
			setError(null);
			try {
				const newTeam = await createTeam(data);
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
				const updatedTeamPartial = await updateTeam(data);
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
