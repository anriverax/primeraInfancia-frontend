import { ITrainingEvaluationTable } from "@/features/trainingEvaluation/trainingEvaluationType";
import { create, StoreApi, UseBoundStore } from "zustand";

type TrainingEvaluationListStoreProps = {
  trainingEvaluationsList: ITrainingEvaluationTable[];
  setTrainingEvaluationsList: (
    _trainingEvaluations:
      | ITrainingEvaluationTable[]
      | ((_prev: ITrainingEvaluationTable[]) => ITrainingEvaluationTable[])
  ) => void;
};

export const useTrainingEvaluationListStore: UseBoundStore<StoreApi<TrainingEvaluationListStoreProps>> =
  create<TrainingEvaluationListStoreProps>()((set) => ({
    trainingEvaluationsList: [],
    setTrainingEvaluationsList: (
      trainingEvaluations:
        | ITrainingEvaluationTable[]
        | ((_prev: ITrainingEvaluationTable[]) => ITrainingEvaluationTable[])
    ) =>
      set((state) => ({
        trainingEvaluationsList:
          typeof trainingEvaluations === "function"
            ? trainingEvaluations(state.trainingEvaluationsList)
            : trainingEvaluations
      }))
  }));
