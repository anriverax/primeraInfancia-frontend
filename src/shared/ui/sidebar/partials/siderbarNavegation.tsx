import { memo } from "react";
import MenuItem from "./menu/menuItem";
import { cn } from "@/shared/utils/tv";
import { useMenuItemsStore } from "@/shared/hooks/store/useMenuItemsStore";

type SidebarNavigationProps = {
  isMobile: boolean;
  isExtended: boolean;
};

const SidebarNavigation = memo(({ isMobile, isExtended }: SidebarNavigationProps): React.JSX.Element => {
  const { menuItems } = useMenuItemsStore();

  return (
    <nav className={cn("px-3 py-4 space-y-1 bg-white overflow-y-auto", { "px-2": !isExtended })}>
      {menuItems.map((item, index) => (
        <MenuItem key={index} item={item} isMobile={isMobile} isExtended={isExtended} />
      ))}
    </nav>
  );
});

SidebarNavigation.displayName = "MemorizedSidebarNavigation";

export { SidebarNavigation };
