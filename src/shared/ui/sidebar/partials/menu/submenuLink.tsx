import { cn } from "@/shared/utils/tv";
import { SubMenuItem } from "../../type";
import Link from "next/link";
import { memo } from "react";

const SubmenuLink = memo(
  ({
    item,
    isActive,
    isSubmenuOpen
  }: {
    item: SubMenuItem;
    isActive: boolean;
    isSubmenuOpen: boolean;
  }): React.JSX.Element => {
    const Icon = item.icon;

    return (
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
        {Icon && (
          <Icon
            className={cn("h-4 w-4 text-gray-50", {
              "text-blue-600 font-bold": isActive && isSubmenuOpen
            })}
          />
        )}
        <span>{item.title}</span>
      </Link>
    );
  }
);

SubmenuLink.displayName = "MemorizedSubmenuLink";

export default SubmenuLink;
