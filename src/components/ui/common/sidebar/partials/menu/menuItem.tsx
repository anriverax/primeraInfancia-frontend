"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/config/tv";
import Link from "next/link";
import { useMenuItem } from "../../hooks/useMenuItem";
import { IMenuPermission } from "@/shared/types/next-auth";
import SubmenuItem from "./submenuItem";
import dynamic from "next/dynamic";
import { memo } from "react";

const LucideIconRenderer = dynamic(
  () => import("@/components/ui/lucideIcon").then((mod) => mod.LucideIconRenderer),
  {
    ssr: false
  }
);

type MenuItemProps = {
  item: IMenuPermission;
  isMobile: boolean;
  isExtended: boolean;
};

const MenuItem = memo(({ item, isMobile, isExtended }: MenuItemProps): React.JSX.Element => {
  const { hasSubmenu, isSubmenuOpen, isActive, pathname, getMenuAnimation, toggleSubmenu } = useMenuItem(
    {
      item,
      isMobile,
      isExtended
    }
  );

  return (
    <div key={item.id} className="relative">
      <Link
        href={!hasSubmenu ? item.path : "#"}
        className={cn(
          "flex items-center gap-3 text-neutral-700 font-light px-4 py-3 transition-all duration-200 ease-in-out relative cursor-pointer group",
          {
            "rounded-lg text-white font-medium bg-primary-400": isActive,
            "rounded-lg hover:bg-[#5d87ff2a] hover:text-primary-400 group-hover:text-primary-400":
              !isActive
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
          className={cn("h-5 w-5 flex-shrink-0 text-neutral-700 font-light transition-colors", {
            "text-white": Boolean(isActive),
            "group-hover:text-primary-400": !isActive
          })}
        />
        <motion.div {...getMenuAnimation()}>
          <span className="flex-1 truncate">{item.title}</span>

          {hasSubmenu && (
            <ChevronDown
              className={cn("h-4 w-4 transition-transform ml-auto text-neutral-700 font-light", {
                "text-white": Boolean(isActive),
                "group-hover:text-primary-400": !isActive,
                "rotate-180": isSubmenuOpen
              })}
            />
          )}
        </motion.div>
      </Link>

      <SubmenuItem isSubmenuOpen={isSubmenuOpen} submenu={item.children} pathname={pathname} />
    </div>
  );
});

MenuItem.displayName = "MemorizedMenuItem";
export default MenuItem;
