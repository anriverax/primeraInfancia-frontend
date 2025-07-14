import { IGroupTable } from "@/features/group/groupType";
import { create, StoreApi, UseBoundStore } from "zustand";

type GroupListStoreProps = {
  groupList: IGroupTable[];
  setGroupsList: (_zones: IGroupTable[] | ((_prev: IGroupTable[]) => IGroupTable[])) => void;
};

export const useGroupListStore: UseBoundStore<StoreApi<GroupListStoreProps>> =
  create<GroupListStoreProps>()((set) => ({
    groupList: [],
    setGroupsList: (groups: IGroupTable[] | ((_prev: IGroupTable[]) => IGroupTable[])) =>
      set((state) => ({
        groupList: typeof groups === "function" ? groups(state.groupList) : groups
      }))
  }));
