import { ModuleReportModalAction } from "@/features/moduleReport/moduleReportType";
import { create, StoreApi, UseBoundStore } from "zustand";

type ModuleReportModalProps = ModuleReportModalAction & {
  reset: () => void;
};

export const useModuleReportModalStore: UseBoundStore<StoreApi<ModuleReportModalProps>> = create<ModuleReportModalProps>()(
  (set) => ({
    isVisible: false,
    typeModal: "Z",
    data: null,
    toggleVisibility: (form, data = null) =>
      set((state) => ({
        isVisible: !state.isVisible,
        typeModal: form,
        data: data
      })),
    reset: () =>
      set({
        isVisible: false,
        typeModal: "Z",
        data: null
      })
  })
);
