import { useCallback, useState } from "react";
import { ZoneModalAction, ZoneModalInput } from "../zone/zoneType";

export const useZoneModal = (): ZoneModalAction => {
  const [isVisibleForm, setVisibleForm] = useState<ZoneModalInput>({
    isVisible: false,
    typeModal: "Z",
    data: null
  });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const toggleVisibility = useCallback((form: "Z" | "G", data: any = null) => {
    setVisibleForm((prev) => ({
      isVisible: !prev.isVisible,
      typeModal: form,
      data: data
    }));
  }, []);

  /* eslint-enable @typescript-eslint/no-explicit-any */

  return { ...isVisibleForm, toggleVisibility };
};
