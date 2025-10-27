import { JSX, memo, useState } from "react";
import { DividerCustom } from "./partials/dividerCustom";
import UserAvatar from "./partials/userAvatar";
import Image from "next/image";
import { Button } from "@heroui/react";
import ModalLayout from "../modal/modalLayout";

const TopBar = memo((): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  return (
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
              className="h-auto w-auto hidden"
            />
          </div>
        </div>
      </div>
      <Button color="primary" variant="shadow" className="mr-2 px-6" onPress={() => setIsOpen(true)}>
        Formulario de incidencias
      </Button>
      <UserAvatar />
      <ModalLayout size="xl" isOpen={isOpen}>
        <div className="flex flex-col h-[80vh]">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <h3 className="text-lg font-medium">Formulario de incidencias</h3>
            <button aria-label="Cerrar" onClick={() => setIsOpen(false)}>
              Cerrar
            </button>
          </div>

          <div className="flex-1">
            <iframe
              allowFullScreen
              src="https://encuestas.cuchillac.net/index.php/211551"
              title="Contenido externo"
              style={{ width: "100%", height: "100%", border: "none" }}
              sandbox="allow-scripts allow-forms allow-same-origin"
            />
          </div>

          <div className="px-4 py-2 border-t text-sm">
            <a
              href="https://encuestas.cuchillac.net/index.php/211551"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Abrir en nueva pestaña
            </a>
          </div>
        </div>
      </ModalLayout>
    </header>
  );
});

TopBar.displayName = "MemorizedTopBar";

export default TopBar;
