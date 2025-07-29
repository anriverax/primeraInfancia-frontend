import { IModuleReportTable } from "@/features/moduleReport/moduleReportType";
import { create, StoreApi, UseBoundStore } from "zustand";

type ModuleReportListStoreProps = {
  moduleReportsList: IModuleReportTable[];
  setModuleReportsList: (_moduleReports: IModuleReportTable[] | ((_prev: IModuleReportTable[]) => IModuleReportTable[])) => void;
};

export const useModuleReportListStore: UseBoundStore<StoreApi<ModuleReportListStoreProps>> =
  create<ModuleReportListStoreProps>()((set) => ({
    moduleReportsList: [],
    setModuleReportsList: (moduleReports: IModuleReportTable[] | ((_prev: IModuleReportTable[]) => IModuleReportTable[])) =>
      set((state) => ({
        moduleReportsList: typeof moduleReports === "function" ? moduleReports(state.moduleReportsList) : moduleReports
      }))
  }));
