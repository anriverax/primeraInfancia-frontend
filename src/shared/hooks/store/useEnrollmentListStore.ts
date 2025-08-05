import { IEnrollmentTable } from "@/features/enrollment/enrollmentType";
import { create, StoreApi, UseBoundStore } from "zustand";

type EnrollmentListStoreProps = {
  enrollmentsList: IEnrollmentTable[];
  setEnrollmentsList: (_Enrollments: IEnrollmentTable[] | ((_prev: IEnrollmentTable[]) => IEnrollmentTable[])) => void;
};

export const useEnrollmentListStore: UseBoundStore<StoreApi<EnrollmentListStoreProps>> =
  create<EnrollmentListStoreProps>()((set) => ({
    enrollmentsList: [],
    setEnrollmentsList: (enrollments: IEnrollmentTable[] | ((_prev: IEnrollmentTable[]) => IEnrollmentTable[])) =>
      set((state) => ({
        enrollmentsList: typeof enrollments === "function" ? enrollments(state.enrollmentsList) : enrollments
      }))
  }));
