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

/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
/* eslint-enable @typescript-eslint/explicit-function-return-type */
// Selectors para prevenir re-renders innecesarios
export const useTechnicianMode = (): TechnicianMode => useTechnicianModeStore((state) => state.mode);
