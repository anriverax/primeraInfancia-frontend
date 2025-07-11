import { cn } from "@/shared/utils/tv";
import Link from "next/link";
import { memo } from "react";
import { IMenuPermission } from "@/shared/types/next-auth";
import dynamic from "next/dynamic";

const LucideIconRenderer = dynamic(
  () => import("@/shared/ui/custom/lucideIcon").then((mod) => mod.LucideIconRenderer),
  {
    ssr: false
  }
);

const SubmenuLink = memo(
  ({
    item,
    isActive,
    isSubmenuOpen
  }: {
    item: IMenuPermission;
    isActive: boolean;
    isSubmenuOpen: boolean;
  }): React.JSX.Element => (
    <Link
      key={item.path}
      href={item.path}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-gray-600",
        {
          "text-blue-600 font-bold": isActive && isSubmenuOpen,
          "hover:bg-gray-100 hover:text-gray-900": !isActive && isSubmenuOpen
        }
      )}
    >
      {item.icon !== "" && (
        <LucideIconRenderer
          iconName={item.icon}
          className={cn("h-4 w-4 text-gray-600", {
            "text-blue-600 font-bold": isActive && isSubmenuOpen
          })}
        />
      )}
      <span>{item.title}</span>
    </Link>
  )
);

SubmenuLink.displayName = "MemorizedSubmenuLink";

export default SubmenuLink;
