import { memo } from "react";
import MenuItem from "./menu/menuItem";
import { cn } from "@/shared/utils/tv";
import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import { IMenuPermission } from "@/shared/types/next-auth";
import { useSession } from "next-auth/react";

type SidebarNavigationProps = {
  isMobile: boolean;
  isExtended: boolean;
};

const SidebarNavigation = memo(({ isMobile, isExtended }: SidebarNavigationProps): React.JSX.Element => {
  const { data: session } = useSession();
  const { data } = useApiQuery<IMenuPermission[]>("menuItems", "/catalogue/menuItems", {
    enabled: !!session,
    description: "Lista de menu"
  });

  return (
    <nav className={cn("px-3 py-4 text-sm space-y-1 overflow-y-auto", { "px-2": !isExtended })}>
      {data &&
        data.map((item) => (
          <MenuItem key={item.id} item={item} isMobile={isMobile} isExtended={isExtended} />
        ))}
    </nav>
  );
});

SidebarNavigation.displayName = "MemorizedSidebarNavigation";

export { SidebarNavigation };
