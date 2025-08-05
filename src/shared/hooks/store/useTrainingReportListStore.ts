import { ITrainingReportTable } from "@/features/trainingReport/trainingReportType";
import { create, StoreApi, UseBoundStore } from "zustand";

type TrainingReportListStoreProps = {
  trainingReportsList: ITrainingReportTable[];
  setTrainingReportsList: (_trainingReportsList: ITrainingReportTable[] | ((_prev: ITrainingReportTable[]) => ITrainingReportTable[])) => void;
};

export const useTrainingReportListStore: UseBoundStore<StoreApi<TrainingReportListStoreProps>> =
  create<TrainingReportListStoreProps>()((set) => ({
    trainingReportsList: [],
    setTrainingReportsList: (trainingReportsList: ITrainingReportTable[] | ((_prev: ITrainingReportTable[]) => ITrainingReportTable[])) =>
      set((state) => ({
        trainingReportsList: typeof trainingReportsList === "function" ? trainingReportsList(state.trainingReportsList) :trainingReportsList
      }))
  }));
