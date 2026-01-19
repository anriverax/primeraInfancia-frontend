"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { useCallback } from "react";
import { useTechnicianModeStore, TechnicianMode } from "@/shared/store/useTechnicianModeStore";
import ModalLayout from "@/shared/ui/custom/modal/modalLayout";

type TechnicianModeModalProps = {
  isOpen: boolean;
  onClose?: () => void;
};

export default function TechnicianModeModal({
  isOpen,
  onClose
}: TechnicianModeModalProps): React.JSX.Element {
  const setMode = useTechnicianModeStore((s) => s.setMode);

  const handleSelect = useCallback(
    (mode: Exclude<TechnicianMode, null>): void => {
      setMode(mode);
      onClose?.();
    },
    [onClose, setMode]
  );

  return (
    <ModalLayout size="md" isOpen={isOpen}>
      <div className="p-6">
        <div className="mb-2 text-center">
          <h2 className="text-xl font-semibold">¿Cómo deseas trabajar?</h2>
          <p className="text-gray-600">
            Selecciona el modo de trabajo para este perfil técnico de apoyo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
          <Card className="border border-gray-200 hover:border-primary">
            <CardBody className="items-center text-center gap-2">
              <div className="text-lg font-medium">Mentor</div>
              <p className="text-sm text-gray-600">
                Registra asistencia y gestiona actividades como mentor.
              </p>
              <Button
                color="primary"
                variant="flat"
                radius="full"
                className="mt-2"
                onPress={(): void => handleSelect("mentor")}
              >
                Elegir Mentor
              </Button>
            </CardBody>
          </Card>

          <Card className="border border-gray-200 hover:border-secondary">
            <CardBody className="items-center text-center gap-2">
              <div className="text-lg font-medium">Formador</div>
              <p className="text-sm text-gray-600">
                Trabaja con funcionalidades orientadas a formadores.
              </p>
              <Button
                color="secondary"
                variant="flat"
                radius="full"
                className="mt-2"
                onPress={(): void => handleSelect("formador")}
              >
                Elegir Formador
              </Button>
            </CardBody>
          </Card>
        </div>

        <p className="mt-6 text-xs text-gray-500 text-center">
          Podrás cambiar esta selección cerrando sesión y volviendo a elegir.
        </p>
      </div>
    </ModalLayout>
  );
}
