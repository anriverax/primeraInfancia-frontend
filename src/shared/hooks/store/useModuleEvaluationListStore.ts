import { IModuleEvaluationTable } from "@/features/moduleEvaluation/moduleEvaluationType";
import { create, StoreApi, UseBoundStore } from "zustand";

type ModuleEvaluationListStoreProps = {
  moduleEvaluationsList: IModuleEvaluationTable[];
  setModuleEvaluationsList: (_moduleEvaluations: IModuleEvaluationTable[] | ((_prev: IModuleEvaluationTable[]) => IModuleEvaluationTable[])) => void;
};

export const useModuleEvaluationListStore: UseBoundStore<StoreApi<ModuleEvaluationListStoreProps>> =
  create<ModuleEvaluationListStoreProps>()((set) => ({
    moduleEvaluationsList: [],
    setModuleEvaluationsList: (moduleEvaluations: IModuleEvaluationTable[] | ((_prev: IModuleEvaluationTable[]) => IModuleEvaluationTable[])) =>
      set((state) => ({
        moduleEvaluationsList: typeof moduleEvaluations === "function" ? moduleEvaluations(state.moduleEvaluationsList) : moduleEvaluations
      }))
  }));
