import { create, StoreApi, UseBoundStore } from "zustand";

type ModalFormVisibleProps = {
  isFormVisible: number;
  setFormVisible: (_n: number) => void;
  reset: () => void;
};

export const useModalFormVisibleStore: UseBoundStore<StoreApi<ModalFormVisibleProps>> =
  create<ModalFormVisibleProps>()((set) => ({
    isFormVisible: 0,
    setFormVisible: (n) => set({ isFormVisible: n }),
    reset: () => set({ isFormVisible: 0 })
  }));

// Selectors para prevenir re-renders innecesarios
export const useFormVisibleId = () => useModalFormVisibleStore((state) => state.isFormVisible);

export const useIsFormVisible = (formId: number) =>
  useModalFormVisibleStore((state) => state.isFormVisible === formId);
