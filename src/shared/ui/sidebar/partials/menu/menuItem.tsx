"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/tv";
import Link from "next/link";
import { useMenuItem } from "../../hooks/useMenuItem";
import { IMenuPermission } from "@/shared/types/next-auth";
import SubmenuItem from "./submenuItem";
import dynamic from "next/dynamic";

const LucideIconRenderer = dynamic(
  () => import("@/shared/ui/custom/lucideIcon").then((mod) => mod.LucideIconRenderer),
  {
    ssr: false
  }
);

type MenuItemProps = { item: IMenuPermission; isMobile: boolean; isExtended: boolean };

const MenuItem = ({ item, isMobile, isExtended }: MenuItemProps): React.JSX.Element => {
  const {
    hasSubmenu,
    isSubmenuOpen,
    isActive,
    pathname,
    isSubmenuActive,
    getMenuAnimation,
    toggleSubmenu
  } = useMenuItem({
    item,
    isMobile,
    isExtended
  });

  return (
    <div key={item.id} className="relative">
      <Link
        href={!hasSubmenu ? item.path : "#"}
        className={cn(
          "flex items-center gap-3 text-gray-600 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out relative cursor-pointer",
          {
            "text-white bg-blue-500 shadow-lg font-bold": isActive || isSubmenuActive, // when parent menu item or children menu item is active
            "shadow-blue-500/50": (isActive || isSubmenuActive) && !isSubmenuOpen, // when parent menu item is active
            "hover:bg-gray-100 hover:text-gray-900": !isActive && !isSubmenuActive // when a menu item it not active
          }
        )}
        onClick={(e) => {
          if (hasSubmenu) {
            e.preventDefault();
            toggleSubmenu(item.path);
          }
        }}
      >
        <LucideIconRenderer
          iconName={item.icon}
          className={cn("h-5 w-5 flex-shrink-0 text-gray-600", {
            "text-white": Boolean(isActive || isSubmenuActive)
          })}
        />
        <motion.div {...getMenuAnimation()}>
          <span className="flex-1 truncate">{item.title}</span>

          {hasSubmenu && (
            <ChevronDown
              className={cn("h-4 w-4 transition-transform ml-auto text-gray-600", {
                "text-white": Boolean(isActive || isSubmenuActive) && !isSubmenuOpen,
                "rotate-180 text-white": isSubmenuOpen
              })}
            />
          )}

          {/*item.badge && (
            <div className="ml-auto flex items-center justify-center w-5 h-5 text-xs font-medium text-blue-600 bg-gray-50 rounded-full">
              {item.badge}
            </div>
          )*/}
        </motion.div>
      </Link>

      <SubmenuItem isSubmenuOpen={isSubmenuOpen} submenu={item.children} pathname={pathname} />
    </div>
  );
};

export default MenuItem;
