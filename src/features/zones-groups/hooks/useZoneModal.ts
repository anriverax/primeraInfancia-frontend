import { useCallback, useState } from "react";
import { create } from "zustand";

type UseZoneModalProps = {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: null;
};

// Función que crea un hook store tipado con T
export const useZoneModal = () => {
  const [isVisibleForm, setVisibleForm] = useState<UseZoneModalProps>({
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

/*
create<ShareDataZGStoreProps>((set, get) => ({
  visible: false,
  state: "Z",
  data: null,
  toggleFormVisibility: (form, data) => {
    const current = get();
    set({
      visible: !current.visible,
      state: form,
      data: data ?? null
    });
  }
}));
*/
