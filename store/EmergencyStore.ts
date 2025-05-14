import { create } from "zustand";

interface EmergencyDetails {
  id: number;
  phone: string;
  price: number;
  title: string;
  description: string;
}

interface EmergencyStore {
  emergencyDetails: EmergencyDetails | null;
  setLawyer: (emergencyDetails: EmergencyDetails) => void;
  updateLawyer: (updates: Partial<EmergencyDetails>) => void;
  clearLawyer: () => void;
}

const useEmergencyStore = create<EmergencyStore>((set) => ({
  emergencyDetails: null,
  setLawyer: (emergencyDetails) => set({ emergencyDetails }),

  updateLawyer: (updates) =>
    set((state) => ({
      emergencyDetails: state.emergencyDetails
        ? { ...state.emergencyDetails, ...updates }
        : null,
    })),

  clearLawyer: () => set({ emergencyDetails: null }),
}));
export default useEmergencyStore;
