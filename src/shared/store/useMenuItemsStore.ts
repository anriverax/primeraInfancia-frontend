import { IMenuPermission } from "@/shared/types/next-auth";
import { create, StoreApi, UseBoundStore } from "zustand";

type MenuItemsProps = {
  menuItems: IMenuPermission[];
  setMenuItems: (_menuItems: IMenuPermission[]) => void;
};

export const useMenuItemsStore: UseBoundStore<StoreApi<MenuItemsProps>> = create<MenuItemsProps>()(
  (set) => ({
    menuItems: [],
    setMenuItems: (m) => set({ menuItems: m })
  })
);

// Selectors para prevenir re-renders innecesarios
export const useMenuItems = () => useMenuItemsStore((state) => state.menuItems);

export const useMenuItemsCount = () => useMenuItemsStore((state) => state.menuItems.length);
