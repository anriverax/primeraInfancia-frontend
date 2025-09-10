import { EvaluationInstrumentModalAction } from "@/features/evaluationInstrument/evaluationInstrumentType";
import { create, StoreApi, UseBoundStore } from "zustand";

type EvaluationInstrumentModalProps = EvaluationInstrumentModalAction & {
  reset: () => void;
};

export const useEvaluationInstrumentModalStore: UseBoundStore<StoreApi<EvaluationInstrumentModalProps>> = create<EvaluationInstrumentModalProps>()(
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
