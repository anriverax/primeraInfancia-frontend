import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MenuItemResult } from "../type";
import { usePathname } from "next/navigation";
import { IMenuPermission } from "@/shared/types/next-auth";

type UseMenuItemProps = {
  item: IMenuPermission;
  isMobile: boolean;
  isExtended: boolean;
};

const useMenuItem = ({ item, isMobile, isExtended }: UseMenuItemProps): MenuItemResult => {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();
  const prevPathnameRef = useRef<string>(pathname);
  const hasSubmenu = item.children && item.children.length > 0;

  const isActive = pathname.startsWith(item.path);

  const isSubmenuOpen = isExtended ? openSubmenus[item.path] || false : false;

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

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;

    // Avoid running the effect on the first render
    if (prevPathname === pathname) return;

    prevPathnameRef.current = pathname;

    if (!hasSubmenu || !openSubmenus[item.path]) return;

    const isChildRoute = item.children?.some(
      (subItem) => pathname === subItem.path || pathname.startsWith(subItem.path)
    );

    // If it is not a child of the submenu, close it.
    if (!isChildRoute) {
      setOpenSubmenus((prev) => ({
        ...prev,
        [item.path]: false
      }));
    }
  }, [pathname, hasSubmenu, openSubmenus, item]);

  return {
    hasSubmenu,
    isSubmenuOpen,
    isActive,
    pathname,
    getMenuAnimation,
    toggleSubmenu
  };
};

export { useMenuItem };
