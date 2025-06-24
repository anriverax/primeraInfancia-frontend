import { useCallback, useState } from "react";

interface IZoneModalData {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: null;
}

//
// Función que crea un hook store tipado con T

/* eslint-disable @typescript-eslint/no-explicit-any*/
export const useZoneModal = () => {
  const [isVisibleForm, setVisibleForm] = useState<IZoneModalData>({
    isVisible: false,
    typeModal: "Z",
    data: null
  });

  const toggleFormVisibility = useCallback((form: "Z" | "G", data: any = null) => {
    setVisibleForm((prev) => ({
      isVisible: !prev.isVisible,
      typeModal: form,
      data: data
    }));
  }, []);

  return { ...isVisibleForm, toggleFormVisibility };
};
