import { IZone } from "@/features/zones-groups/zone/zoneType";
import { create, StoreApi, UseBoundStore } from "zustand";

type ZoneListStoreProps = {
  zonesList: IZone[];
  setZonesList: (_zones: IZone[]) => void;
};

export const useZoneListStore: UseBoundStore<StoreApi<ZoneListStoreProps>> =
  create<ZoneListStoreProps>()((set) => ({
    zonesList: [],
    setZonesList: (zones) => set({ zonesList: zones })
  }));
