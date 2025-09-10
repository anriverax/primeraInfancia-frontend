import { ITrainingModuleTable } from "@/features/trainingModule/trainingModuleType";
import { create, StoreApi, UseBoundStore } from "zustand";

type TrainingModuleListStoreProps = {
  trainingModulesList: ITrainingModuleTable[];
  setTrainingModulesList: (_trainingModules: ITrainingModuleTable[] | ((_prev: ITrainingModuleTable[]) => ITrainingModuleTable[])) => void;
};

export const useTrainingModuleListStore: UseBoundStore<StoreApi<TrainingModuleListStoreProps>> =
  create<TrainingModuleListStoreProps>()((set) => ({
    trainingModulesList: [],
    setTrainingModulesList: (trainingModules: ITrainingModuleTable[] | ((_prev: ITrainingModuleTable[]) => ITrainingModuleTable[])) =>
      set((state) => ({
        trainingModulesList: typeof trainingModules === "function" ? trainingModules(state.trainingModulesList) : trainingModules
      }))
  }));
