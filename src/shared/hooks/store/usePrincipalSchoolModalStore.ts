import { ISchoolDetailTable } from "@/features/schools/school/schoolType";
import { create, StoreApi, UseBoundStore } from "zustand";


type SchoolListStoreProps = {
  schoolsDetailsList: ISchoolDetailTable[];
  setSchoolsDetailsList: (_schools: ISchoolDetailTable[] | ((_prev: ISchoolDetailTable[]) => ISchoolDetailTable[])) => void;
};

export const useSchoolDetailListStore: UseBoundStore<StoreApi<SchoolListStoreProps>> =
  create<SchoolListStoreProps>()((set) => ({
    schoolsDetailsList: [],
    setSchoolsDetailsList: (schools: ISchoolDetailTable[] | ((_prev: ISchoolDetailTable[]) => ISchoolDetailTable[])) =>
      set((state) => ({
        schoolsDetailsList: typeof schools === "function" ? schools(state.schoolsDetailsList) : schools
      }))
  }));