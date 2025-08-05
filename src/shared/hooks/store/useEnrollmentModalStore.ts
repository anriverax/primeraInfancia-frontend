import { EnrollmentModalAction } from "@/features/enrollment/enrollmentType";
import { create, StoreApi, UseBoundStore } from "zustand";

type EnrollmentModalProps = EnrollmentModalAction & {
  reset: () => void;
};

export const useEnrollmentModalStore: UseBoundStore<StoreApi<EnrollmentModalProps>> = create<EnrollmentModalProps>()(
  (set) => ({
    isVisible: false,
    typeModal: "Z",
    data: null,
    toggleVisibility: (form, data = null) =>
      set((state) => ({
        isVisible: !state.isVisible,
        typeModal: form,
        data: data
      })),
    reset: () =>
      set({
        isVisible: false,
        typeModal: "Z",
        data: null
      })
  })
);
