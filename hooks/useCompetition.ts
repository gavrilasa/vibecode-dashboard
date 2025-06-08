// hooks/useCompetition.ts
"use client";

import { useState, useCallback } from "react";
import { getCompetitions, getCompetition } from "@/lib/competition";
import { Competition } from "@/types/competition";

// NOTE: Hook ini tidak lagi memakai useApi karena strukturnya cukup unik
// dengan dua state (competitions dan competition).
// Mempertahankannya seperti ini lebih sederhana daripada menggabungkan
// dua useApi dan state loading/error mereka.
export function useCompetition() {
	const [competitions, setCompetitions] = useState<Competition[]>([]);
	const [competition, setCompetition] = useState<Competition | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchCompetitions = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await getCompetitions();
			setCompetitions(data);
		} catch (err: any) {
			setError(err.message || "Failed to fetch competitions");
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchCompetition = useCallback(async (id: number) => {
		setLoading(true);
		setError(null);
		try {
			const data = await getCompetition(id);
			setCompetition(data);
		} catch (err: any) {
			setError(err.message || "Failed to fetch competition");
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		competitions,
		competition,
		loading,
		error,
		fetchCompetitions,
		fetchCompetition,
	};
}
