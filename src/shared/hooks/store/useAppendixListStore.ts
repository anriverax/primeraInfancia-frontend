import { IAppendixTable } from "@/features/attachment/appendixType";
import { create, StoreApi, UseBoundStore } from "zustand";

type AppendixListStoreProps = {
  appendixsList: IAppendixTable[];
  setAppendixsList: (
    _appendix: IAppendixTable[] | ((_prev: IAppendixTable[]) => IAppendixTable[])
  ) => void;
};

export const useAppendixListStore: UseBoundStore<StoreApi<AppendixListStoreProps>> =
  create<AppendixListStoreProps>()((set) => ({
    appendixsList: [],
    setAppendixsList: (appendix: IAppendixTable[] | ((_prev: IAppendixTable[]) => IAppendixTable[])) =>
      set((state) => ({
        appendixsList: typeof appendix === "function" ? appendix(state.appendixsList) : appendix
      }))
  }));
