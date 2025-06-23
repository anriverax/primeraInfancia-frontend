import { JSX, memo } from "react";
import { DividerCustom } from "./partials/dividerCustom";
import UserAvatar from "./partials/userAvatar";
import { TopBarProps } from "@/shared/types/globals";

const TopBar = memo(
  (props: TopBarProps): JSX.Element => (
    <header className="flex h-[58px] bg-white shrink-0 items-center gap-2 border-b border-gray-200 px-4">
      <div className="flex items-center justify-between gap-2 px-14 md:px-10 w-full">
        <div className="flex items-center">
          <DividerCustom />
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
        </div>
      </div>
      <UserAvatar {...props} />
    </header>
  )
);

TopBar.displayName = "MemorizedTopBar";

export default TopBar;
