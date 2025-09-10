import { TrainingEvaluationModalAction } from "@/features/trainingEvaluation/trainingEvaluationType";
import { create, StoreApi, UseBoundStore } from "zustand";

type TrainingEvaluationModalProps = TrainingEvaluationModalAction & {
  reset: () => void;
};

export const useTrainingEvaluationModalStore: UseBoundStore<StoreApi<TrainingEvaluationModalProps>> = create<TrainingEvaluationModalProps>()(
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
