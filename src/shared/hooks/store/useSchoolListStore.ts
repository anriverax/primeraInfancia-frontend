import { ISchoolTable } from "@/features/schools/school/schoolType";
import { create, StoreApi, UseBoundStore } from "zustand";

type SchoolListStoreProps = {
  schoolsList: ISchoolTable[];
  setSchoolsList: (_schools: ISchoolTable[] | ((_prev: ISchoolTable[]) => ISchoolTable[])) => void;
};

export const useSchoolListStore: UseBoundStore<StoreApi<SchoolListStoreProps>> =
  create<SchoolListStoreProps>()((set) => ({
    schoolsList: [],
    setSchoolsList: (schools: ISchoolTable[] | ((_prev: ISchoolTable[]) => ISchoolTable[])) =>
      set((state) => ({
        schoolsList: typeof schools === "function" ? schools(state.schoolsList) : schools
      }))
  }));
