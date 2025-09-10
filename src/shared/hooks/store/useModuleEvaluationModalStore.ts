import { ModuleEvaluationModalAction } from "@/features/moduleEvaluation/moduleEvaluationType";
import { create, StoreApi, UseBoundStore } from "zustand";

type ModuleEvaluationModalProps = ModuleEvaluationModalAction & {
  reset: () => void;
};

export const useModuleEvaluationModalStore: UseBoundStore<StoreApi<ModuleEvaluationModalProps>> = create<ModuleEvaluationModalProps>()(
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
