import { memo } from "react";
import { SidebarItemType } from "../type";
import MenuItem from "./menu/menuItem";
import { cn } from "@/shared/utils/tv";

type SidebarNavigationProps = {
  items: SidebarItemType[];
  isMobile: boolean;
  isExtended: boolean;
};

const SidebarNavigation = memo(
  ({ items, isMobile, isExtended }: SidebarNavigationProps): React.JSX.Element => (
    <nav className={cn("px-3 py-4 space-y-1 bg-white overflow-y-auto", { "px-2": !isExtended })}>
      {items.map((item, index) => (
        <MenuItem key={index} item={item} isMobile={isMobile} isExtended={isExtended} />
      ))}
    </nav>
  )
);

SidebarNavigation.displayName = "MemorizedSidebarNavigation";

export { SidebarNavigation };
