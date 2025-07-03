import { ElementType, JSX } from "react";

export interface SubMenuItem {
  title: string;
  path: string;
  icon?: React.ElementType;
}

export interface SidebarItemType {
  title: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
  submenu?: SubMenuItem[];
}

export interface MenuItemResult {
  hasSubmenu: boolean | undefined;
  isSubmenuOpen: boolean;
  isActive: boolean;
  pathname: string;
  isSubmenuActive: boolean;
  getMenuAnimation: () => {
    initial: boolean;
    animate: {
      width: string | number;
      opacity: number;
    };
    transition: {
      duration: number;
      ease: any;
    };
    className: string;
  };
  toggleSubmenu: (_path: string) => void;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  Icon: ElementType<any, keyof JSX.IntrinsicElements>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
