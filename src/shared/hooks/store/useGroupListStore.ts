import { IGroupTable } from "@/features/zones-groups/group/groupType";
import { create, StoreApi, UseBoundStore } from "zustand";

type GroupListStoreProps = {
  groupList: IGroupTable[];
  setGroupsList: (_zones: IGroupTable[]) => void;
};

export const useGroupListStore: UseBoundStore<StoreApi<GroupListStoreProps>> =
  create<GroupListStoreProps>()((set) => ({
    groupList: [],
    setGroupsList: (groups) => set({ groupList: groups })
  }));
