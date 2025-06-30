import { useZoneListStore } from "@/shared/hooks/store/useZoneListStore";

const useGroupSelectBox = () => {
  const { zonesList } = useZoneListStore();

  return {
    zonesList
  };
};

export { useGroupSelectBox };
