// store/registration-flow-store.ts
import { create } from "zustand";
import { Competition } from "@/types/competition";

interface RegistrationFlowState {
	selectedCompetition: Competition | null;
	setSelectedCompetition: (competition: Competition | null) => void;
	clearFlow: () => void;
}

export const useRegistrationFlowStore = create<RegistrationFlowState>(
	(set) => ({
		selectedCompetition: null,
		setSelectedCompetition: (competition) =>
			set({ selectedCompetition: competition }),
		clearFlow: () => set({ selectedCompetition: null }),
	})
);
