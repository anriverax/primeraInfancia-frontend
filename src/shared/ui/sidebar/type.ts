/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MenuItemResult {
  hasSubmenu: boolean | undefined;
  isSubmenuOpen: boolean;
  isActive: boolean;
  pathname: string;

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
}
/* eslint-enable @typescript-eslint/no-explicit-any */
