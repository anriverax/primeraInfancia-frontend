import { IAppendixDetailTable } from "@/features/attachment/appendixDetailType";
import { create, StoreApi, UseBoundStore } from "zustand";

type AppendixDetailListStoreProps = {
  appendixDetailsList: IAppendixDetailTable[];
  setAppendixDetailsList: (
    _appendixDetail: IAppendixDetailTable[] | ((_prev: IAppendixDetailTable[]) => IAppendixDetailTable[])
  ) => void;
};

export const useAppendixDetailListStore: UseBoundStore<StoreApi<AppendixDetailListStoreProps>> =
  create<AppendixDetailListStoreProps>()((set) => ({
    appendixDetailsList: [],
    setAppendixDetailsList: (
      appendixDetail:
        | IAppendixDetailTable[]
        | ((_prev: IAppendixDetailTable[]) => IAppendixDetailTable[])
    ) =>
      set((state) => ({
        appendixDetailsList:
          typeof appendixDetail === "function"
            ? appendixDetail(state.appendixDetailsList)
            : appendixDetail
      }))
  }));
