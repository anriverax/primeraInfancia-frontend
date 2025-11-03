"use client";

import React from "react";
import ModalLayout from "@/shared/ui/modal/modalLayout";

type ModalWithIframeProps = {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
  // Permisos opcionales para el sandbox del iframe.
  // Por defecto, damos permisos razonables; ajústalo según tus necesidades.
  sandbox?: string;
  // Altura del área visible del modal (por defecto 80vh)
  heightClassName?: string;
};

/**
 * ModalWithIframe
 * Muestra contenido externo dentro de un iframe embebido en el modal base del proyecto.
 * Nota: El sitio externo debe permitir ser embebido (sin X-Frame-Options DENY/SAMEORIGIN
 * ni CSP frame-ancestors que lo bloqueen). De lo contrario, el navegador impedirá la carga.
 */
export default function ModalWithIframe({
  isOpen,
  onClose,
  url,
  title = "Vista externa",
  sandbox = "allow-scripts allow-forms allow-same-origin",
  heightClassName = "h-[80vh]"
}: ModalWithIframeProps): React.JSX.Element {
  return (
    <ModalLayout size="xl" isOpen={isOpen}>
      <div className={`flex flex-col ${heightClassName}`}>
        <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
          <h3 className="text-base md:text-lg font-medium truncate" title={title}>
            {title}
          </h3>
          <div className="flex items-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline text-sm"
            >
              Abrir en nueva pestaña
            </a>
            <button
              type="button"
              aria-label="Cerrar"
              className="px-3 py-1.5 rounded-md border bg-gray-50 hover:bg-gray-100 text-sm"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white">
          <iframe
            allowFullScreen
            sandbox={sandbox}
            src={url}
            title={title}
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>
    </ModalLayout>
  );
}
