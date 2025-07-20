import { ElementType, JSX } from "react";

export interface SubMenuItem {
  title: string;
  path: string;
  icon?: React.ElementType;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
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

  Icon: ElementType<any, keyof JSX.IntrinsicElements>;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
