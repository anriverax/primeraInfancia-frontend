import { useCallback, useMemo, useState } from "react";
import { MenuItemResult } from "../type";
import { usePathname } from "next/navigation";
import { IMenuPermission } from "@/shared/types/next-auth";
import * as Icons from "lucide-react";

type UseMenuItemProps = {
  item: IMenuPermission;
  isMobile: boolean;
  isExtended: boolean;
};

const useMenuItem = ({ item, isMobile, isExtended }: UseMenuItemProps): MenuItemResult => {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  console.log(pathname);
  const isActive = pathname.startsWith(item.path);

  const isSubmenuOpen = isExtended ? openSubmenus[item.path] : false;
  const Icon = Icons[item.icon as keyof typeof Icons] || Icons.HelpCircle;

  const isSubmenuActive = useMemo((): boolean => {
    if (hasSubmenu) {
      const result = item.submenu?.some(
        (subItem) => pathname === subItem.path || pathname.includes(subItem.path)
      ) as boolean;

      return result;
    }
    return false;
  }, [pathname, hasSubmenu, item.submenu]);

  const getMenuAnimation = useCallback(
    () => ({
      initial: false,
      animate: { width: isExtended || isMobile ? "auto" : 0, opacity: isExtended || isMobile ? 1 : 0 },
      transition: { duration: 0.5, ease: "easeInOut" },
      className: "flex flex-1 items-center overflow-hidden"
    }),
    [isExtended, isMobile]
  );

  // Toggle submenu
  const toggleSubmenu = (path: string): void => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  return {
    hasSubmenu,
    isSubmenuOpen,
    isActive,
    pathname,
    isSubmenuActive,
    getMenuAnimation,
    toggleSubmenu,
    Icon
  };
};

export { useMenuItem };
