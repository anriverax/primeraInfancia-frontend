import { IEvaluationInstrumentTable } from "@/features/evaluationInstrument/evaluationInstrumentType";
import { create, StoreApi, UseBoundStore } from "zustand";

type EvaluationInstrumentListStoreProps = {
  evaluationInstrumentsList: IEvaluationInstrumentTable[];
  setEvaluationInstrumentsList: (_evaluationInstruments: IEvaluationInstrumentTable[] | ((_prev: IEvaluationInstrumentTable[]) => IEvaluationInstrumentTable[])) => void;
};

export const useEvaluationInstrumentListStore: UseBoundStore<StoreApi<EvaluationInstrumentListStoreProps>> =
  create<EvaluationInstrumentListStoreProps>()((set) => ({
    evaluationInstrumentsList: [],
    setEvaluationInstrumentsList: (evaluationInstruments: IEvaluationInstrumentTable[] | ((_prev: IEvaluationInstrumentTable[]) => IEvaluationInstrumentTable[])) =>
      set((state) => ({
        evaluationInstrumentsList: typeof evaluationInstruments === "function" ? evaluationInstruments(state.evaluationInstrumentsList) : evaluationInstruments
      }))
  }));
