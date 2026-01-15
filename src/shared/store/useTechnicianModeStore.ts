import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TechnicianMode = "mentor" | "formador" | null | false;

type TechnicianModeState = {
  mode: TechnicianMode;
  setMode: (mode: Exclude<TechnicianMode, null>) => void;
  reset: () => void;
};

/**
 * Persisted store to keep the chosen working mode for users with role USER_TECNICO_APOYO.
 * Persists across refresh via localStorage and should be cleared on logout.
 */
export const useTechnicianModeStore = create<TechnicianModeState>()(
  persist(
    (set) => ({
      mode: null,
      setMode: (mode) => set({ mode }),
      reset: () => set({ mode: false })
    }),
    {
      name: "technician-mode-storage"
    }
  )
);

// Selectors para prevenir re-renders innecesarios
export const useTechnicianMode = () => useTechnicianModeStore((state) => state.mode);

export const useIsTechnicianModeMentor = () =>
  useTechnicianModeStore((state) => state.mode === "mentor");

export const useIsTechnicianModeFormador = () =>
  useTechnicianModeStore((state) => state.mode === "formador");
