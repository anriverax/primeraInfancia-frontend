import { GroupModalAction } from "@/features/group/groupType";
import { create, StoreApi, UseBoundStore } from "zustand";

type GroupModalProps = GroupModalAction & {
  reset: () => void;
};

export const useGroupModalStore: UseBoundStore<StoreApi<GroupModalProps>> = create<GroupModalProps>()(
  (set) => ({
    isVisible: false,
    data: null,
    toggleVisibility: (data = null) =>
      set((state) => ({
        isVisible: !state.isVisible,
        data: data
      })),
    reset: () =>
      set({
        isVisible: false,
        data: null
      })
  })
);
