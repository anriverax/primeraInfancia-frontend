import { TrainingModuleModalAction } from "@/features/trainingModule/trainingModuleType";
import { create, StoreApi, UseBoundStore } from "zustand";

type TrainingModuleModalProps = TrainingModuleModalAction & {
  reset: () => void;
};

export const useTrainingModuleModalStore: UseBoundStore<StoreApi<TrainingModuleModalProps>> = create<TrainingModuleModalProps>()(
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
