import { ISchoolCoordenate } from "@/features/schools/school/schoolType";
import { create, StoreApi, UseBoundStore } from "zustand";


type SchoolCoordenateStoreProps = {
  schoolCoordenate: ISchoolCoordenate[];
  setSchoolCoordenate: (_schools: ISchoolCoordenate[] | ((_prev: ISchoolCoordenate[]) => ISchoolCoordenate[])) => void;
};

export const useSchoolDetailListStore: UseBoundStore<StoreApi<SchoolCoordenateStoreProps>> =
  create<SchoolCoordenateStoreProps>()((set) => ({
    schoolCoordenate: [],
    setSchoolCoordenate: (schools: ISchoolCoordenate[] | ((_prev: ISchoolCoordenate[]) => ISchoolCoordenate[])) =>
      set((state) => ({
        schoolCoordenate: typeof schools === "function" ? schools(state.schoolCoordenate) : schools
      }))
  }));