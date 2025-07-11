import { memo } from "react";
import MenuItem from "./menu/menuItem";
import { cn } from "@/shared/utils/tv";
import { useQueryRequest } from "@/shared/hooks/useQueryRequest";
import { IMenuPermission } from "@/shared/types/next-auth";
import { useSession } from "next-auth/react";

type SidebarNavigationProps = {
  isMobile: boolean;
  isExtended: boolean;
};

const SidebarNavigation = memo(({ isMobile, isExtended }: SidebarNavigationProps): React.JSX.Element => {
  const { data: session } = useSession();
  const { data } = useQueryRequest<IMenuPermission[]>(
    "menuItems",
    "/catalogue/menuItems",
    !!session,
    "Lista de menu"
  );

  return (
    <nav className={cn("px-3 py-4 space-y-1 bg-white overflow-y-auto", { "px-2": !isExtended })}>
      {data &&
        data.map((item, index) => (
          <MenuItem key={index} item={item} isMobile={isMobile} isExtended={isExtended} />
        ))}
    </nav>
  );
});

SidebarNavigation.displayName = "MemorizedSidebarNavigation";

export { SidebarNavigation };
