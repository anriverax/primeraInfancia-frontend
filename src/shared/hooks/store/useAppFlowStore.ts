import { create } from "zustand";

type AppFlowState = {
  isSigningOut: boolean;
  setSigningOut: (v: boolean) => void;
};

// Volatile UI flags (not persisted)
export const useAppFlowStore = create<AppFlowState>()((set) => ({
  isSigningOut: false,
  setSigningOut: (v) => set({ isSigningOut: v })
}));
