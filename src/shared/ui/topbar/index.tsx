import { JSX, memo } from "react";
import { DividerCustom } from "./partials/dividerCustom";
import UserAvatar from "./partials/userAvatar";
import Image from "next/image";
import { Button } from "@heroui/react";
import Link from "next/link";

const TopBar = memo(
  (): JSX.Element => (
    <header className="flex items-center h-[58px] bg-white border-b border-gray-200 px-0 shrink-0">
      <div className="flex items-center justify-between w-full px-5 md:px-8 gap-4">
        <div className="flex items-center gap-2">
          <DividerCustom />
          <div className="flex items-center gap-2">
            <Image
              priority
              src="/logo-crecer.png"
              alt="logo de Crecer Juntos"
              width={94}
              height={25}
              className="h-auto w-auto"
            />
            <Image
              src="/nueva-escuela-logo.png"
              alt="logo de Mi nueva escuela"
              width={94}
              height={25}
              className="h-auto w-auto hidden"
            />
          </div>
        </div>
      </div>
      <Button
        as={Link}
        href="https://encuestas.cuchillac.net/index.php/211551"
        target="_blank"
        color="primary"
        variant="shadow"
        className="mr-2 px-6"
      >
        Formulario de incidencias
      </Button>
      <UserAvatar />
    </header>
  )
);

TopBar.displayName = "MemorizedTopBar";

export default TopBar;
