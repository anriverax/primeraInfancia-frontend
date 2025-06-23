import { create, StoreApi, UseBoundStore } from "zustand";

type NumberStore = {
  showForm: number;
  setShowForm: (_n: number) => void;
  reset: () => void;
};

export const useActiveFormStore: UseBoundStore<StoreApi<NumberStore>> = create<NumberStore>()((set) => ({
  showForm: 0,
  setShowForm: (n) => set({ showForm: n }),
  reset: () => set({ showForm: 0 })
}));
