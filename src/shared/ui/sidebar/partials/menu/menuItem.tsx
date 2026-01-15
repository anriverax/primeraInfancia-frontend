"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/tv";
import Link from "next/link";
import { useMenuItem } from "../../hooks/useMenuItem";
import { IMenuPermission } from "@/shared/types/next-auth";
import SubmenuItem from "./submenuItem";
import dynamic from "next/dynamic";
import { memo } from "react";

const LucideIconRenderer = dynamic(
  () => import("@/shared/ui/custom/lucideIcon").then((mod) => mod.LucideIconRenderer),
  {
    ssr: false
  }
);

type MenuItemProps = {
  item: IMenuPermission;
  isMobile: boolean;
  isExtended: boolean;
  index?: number;
  prevItem?: IMenuPermission | null;
  nextItem?: IMenuPermission | null;
};

const MenuItem = memo(
  ({ item, isMobile, isExtended, index = 0, prevItem, nextItem }: MenuItemProps): React.JSX.Element => {
    const { hasSubmenu, isSubmenuOpen, isActive, pathname, getMenuAnimation, toggleSubmenu } =
      useMenuItem({
        item,
        isMobile,
        isExtended
      });

    return (
      <div key={item.id} className="relative">
        <Link
          href={!hasSubmenu ? item.path : "#"}
          className={cn(
            "flex items-center gap-3 text-neutral-500 px-4 py-3 transition-all duration-200 ease-in-out relative cursor-pointer",
            {
              "rounded-xl text-primary-400 bg-primary-200/50": isActive, // when parent menu item or children menu item is active
              "hover:bg-primary-50 hover:text-primary-600": !isActive // when a menu item it not active
            }
          )} // https://preview.sprukomarket.com/aspnet/bootstrap/meno/dist/html/index4.html
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
              "text-white": Boolean(isActive)
            })}
          />
          <motion.div {...getMenuAnimation()}>
            <span className="flex-1 truncate">{item.title}</span>

            {hasSubmenu && (
              <ChevronDown
                className={cn("h-4 w-4 transition-transform ml-auto text-gray-600", {
                  "text-white": Boolean(isActive) && !isSubmenuOpen,
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
  }
);

MenuItem.displayName = "MemorizedMenuItem";
export default MenuItem;
