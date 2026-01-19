import { create } from "zustand";

type AppState = {
  isSigningOut: boolean;
  setSigningOut: (value: boolean) => void;
};

export const useAppStateStore = create<AppState>()((set) => ({
  isSigningOut: false,
  setSigningOut: (value): void => set({ isSigningOut: value })
}));

// Selector para prevenir re-renders innecesarios
export const useIsSigningOut = (): boolean => useAppStateStore((state) => state.isSigningOut);
