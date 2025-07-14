import { IZoneTable } from "@/features/zone/zoneType";
import { create, StoreApi, UseBoundStore } from "zustand";

type ZoneListStoreProps = {
  zonesList: IZoneTable[];
  setZonesList: (_zones: IZoneTable[] | ((_prev: IZoneTable[]) => IZoneTable[])) => void;
};

export const useZoneListStore: UseBoundStore<StoreApi<ZoneListStoreProps>> =
  create<ZoneListStoreProps>()((set) => ({
    zonesList: [],
    setZonesList: (zones: IZoneTable[] | ((_prev: IZoneTable[]) => IZoneTable[])) =>
      set((state) => ({
        zonesList: typeof zones === "function" ? zones(state.zonesList) : zones
      }))
  }));
