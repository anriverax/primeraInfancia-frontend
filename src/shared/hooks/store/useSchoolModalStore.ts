import { SchoolModalAction } from "@/features/schools/school/schoolType";
import { create, StoreApi, UseBoundStore } from "zustand";

type SchoolModalProps = SchoolModalAction & {
  reset: () => void;
};

export const useSchoolModalStore: UseBoundStore<StoreApi<SchoolModalProps>> = create<SchoolModalProps>()(
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
