import { ZoneModalAction } from "@/features/zones-groups/zone/zoneType";
import { create, StoreApi, UseBoundStore } from "zustand";

type ZoneModalProps = ZoneModalAction & {
  reset: () => void;
};

export const useZoneModalStore: UseBoundStore<StoreApi<ZoneModalProps>> = create<ZoneModalProps>()(
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
