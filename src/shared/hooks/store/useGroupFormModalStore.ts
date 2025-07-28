import { GroupFormModalAction } from "@/features/group/groupType";
import { create, StoreApi, UseBoundStore } from "zustand";

type GroupFormModalProps = GroupFormModalAction & {
  reset: () => void;
};

export const useGroupFormModalStore: UseBoundStore<StoreApi<GroupFormModalProps>> =
  create<GroupFormModalProps>()((set) => ({
    isOpen: false,
    data: null,
    isOpenGroupFormModal: (data = null) =>
      set((state) => ({
        isOpen: !state.isOpen,
        data: data
      })),
    reset: () =>
      set({
        isOpen: false,
        data: null
      })
  }));
