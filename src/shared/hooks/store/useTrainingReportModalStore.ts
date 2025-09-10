import { TrainingReportModalAction } from "@/features/trainingReport/trainingReportType";
import { create, StoreApi, UseBoundStore } from "zustand";

type TrainingReportModalProps = TrainingReportModalAction & {
  reset: () => void;
};

export const useTrainingReportModalStore: UseBoundStore<StoreApi<TrainingReportModalProps>> =
  create<TrainingReportModalProps>()((set) => ({
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
  }));
