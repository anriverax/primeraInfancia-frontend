import { JSX, memo } from "react";
import { DividerCustom } from "./partials/dividerCustom";
import UserAvatar from "./partials/userAvatar";
import Image from "next/image";

const TopBar = memo(
  (): JSX.Element => (
    <header className="flex items-center h-[58px] bg-white border-b border-gray-200 px-4 shrink-0">
      <div className="flex items-center justify-between w-full px-14 md:px-10 gap-4">
        <div className="flex items-center gap-2">
          <DividerCustom />
          <div className="flex items-center gap-2">
            <Image
              priority
              src="/crecer-juntos-logo.png"
              alt="logo de Crecer Juntos"
              width={94}
              height={25}
              className="h-auto w-auto"
            />
            <Image
              src="/mined-logo.png"
              alt="logo del MINED"
              width={94}
              height={25}
              className="h-auto w-auto"
            />
            <Image
              src="/nueva-escuela-logo.png"
              alt="logo de Mi nueva escuela"
              width={94}
              height={25}
              className="h-auto w-auto"
            />
          </div>
        </div>
      </div>
      <UserAvatar />
    </header>
  )
);

TopBar.displayName = "MemorizedTopBar";

export default TopBar;
