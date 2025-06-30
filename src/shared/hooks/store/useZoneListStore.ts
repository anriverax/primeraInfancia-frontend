import { IZoneTable } from "@/features/zones-groups/zone/zoneType";
import { create, StoreApi, UseBoundStore } from "zustand";

type ZoneListStoreProps = {
  zonesList: IZoneTable[];
  setZonesList: (_zones: IZoneTable[]) => void;
};

export const useZoneListStore: UseBoundStore<StoreApi<ZoneListStoreProps>> =
  create<ZoneListStoreProps>()((set) => ({
    zonesList: [],
    setZonesList: (zones) => set({ zonesList: zones })
  }));
