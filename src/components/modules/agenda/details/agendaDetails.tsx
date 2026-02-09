import { ModalHeaderContent } from "@/components/ui/modal/modalHeaderCustom";
import { CalendarCheck } from "lucide-react";
import { usePlannedEvent } from "../hook/usePlannedEvent";
import { DrawerBody } from "@heroui/react";
import LoadingSkeleton from "@/components/ui/common/loadingSkeleton";
import { ITeacherListWithSchoolV2 } from "../agenda.type";
import AgendaTableTeachers from "../table/agendaTableTeachers";

type AgendaDetailsProps = {
  plannedId: number;
};

const AgendaDetails = ({ plannedId }: AgendaDetailsProps): React.JSX.Element => {
  const { plannedEventData, isLoading } = usePlannedEvent(
    plannedId,
    `plannedEvent-${plannedId}-details`,
    `/plannedEvent/details/${plannedId}`
  );

  const plannedEventDataExists = plannedEventData;

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <ModalHeaderContent
        title={plannedEventData.eventInstance.name}
        imageSrc="/titles/plannedEvent.svg"
        icon={<CalendarCheck className="h-6 w-6 text-neutral-600" />}
        variant="drawer"
      />
      <DrawerBody className="space-y-6 py-6">
        <div className="space-y-6">
          <p className="font-bold text-neutral-700 text-sm border-b py-2 border-neutral-200">
            Información del Evento
          </p>
          <div className="grid text-[13px] grid-cols-2 gap-4">
            <ul>
              <li>
                <span className="font-bold">Tipo de Evento</span>
                <p>{plannedEventDataExists.eventInstance.name}</p>
              </li>
            </ul>
            <ul>
              <li>
                <span className="font-bold">Módulo</span>
                <p>{plannedEventDataExists.module.name}</p>
              </li>
            </ul>
          </div>
          <div className="grid text-[13px] grid-cols-2 gap-4">
            <ul>
              <li>
                <span className="font-bold">Fecha y Hora</span>
                <p>{plannedEventDataExists.start}</p>
              </li>
            </ul>
            <ul>
              <li>
                <span className="font-bold">Cantidad de Docentes</span>
                <p>{plannedEventDataExists.teachers.length}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-6">
          <p className="font-bold text-neutral-700 text-sm border-b py-2 border-neutral-200">
            Docentes Asignados
          </p>
          <AgendaTableTeachers
            teachers={plannedEventDataExists.teachers as ITeacherListWithSchoolV2[]}
          />
        </div>
      </DrawerBody>
    </>
  );
};

export default AgendaDetails;
