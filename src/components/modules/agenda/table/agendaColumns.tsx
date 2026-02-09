import { useCallback } from "react";
import { IColumns } from "@/shared/types/globals";
import { DetailAction } from "@/components/ui/actions/detail";
import { CalendarClock } from "lucide-react";
import { AgendaHeaderColumnsKey, AgendaTableType } from "../agenda.type";
import { PlayAction } from "@/components/ui/actions/play";
import { UserAddAction } from "@/components/ui/actions/user";

export const agendaHeaderColumns: IColumns<AgendaHeaderColumnsKey>[] = [
  {
    key: "title",
    label: "Evento"
  },
  { key: "trainingModule", label: "Módulo" },
  {
    key: "start",
    label: "Fecha y hora de ejecución"
  },
  {
    key: "actions",
    label: "Acción"
  }
];

/* eslint-disable react-hooks/exhaustive-deps */
export const useRenderAgendaCell = (
  handleOpenForm: (plannedId: number) => void,
  handleOnOpenDrawer: (plannedId: number) => void
): ((
  _agenda: AgendaTableType,
  _columnKey: AgendaHeaderColumnsKey
) => string | number | undefined | null | React.JSX.Element) => {
  return useCallback((agendaData: AgendaTableType, columnKey: AgendaHeaderColumnsKey) => {
    let cellValue = agendaData[columnKey as keyof AgendaTableType];
    switch (columnKey) {
      case "start":
        return (
          <span className="flex items-center gap-1">
            <CalendarClock className="w-4 h-4" />
            {agendaData.start}
          </span>
        );
      case "trainingModule":
        return agendaData.extendedProps.trainingModule;
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <PlayAction
              url={`./agenda/${encodeURIComponent(agendaData.id!)}`}
              description="Iniciar evento"
            />
            {!agendaData.isHideButton && (
              <UserAddAction
                url="#"
                description="Agregar docentes"
                onClick={() => handleOpenForm(agendaData.id!)}
              />
            )}
            <DetailAction
              url="#"
              description="Editar agenda"
              onClick={() => handleOnOpenDrawer(agendaData.id!)}
            />
          </div>
        );
      default: {
        const value = agendaData[columnKey as keyof AgendaTableType];
        if (
          typeof value === "string" ||
          typeof value === "number" ||
          value === null ||
          value === undefined
        ) {
          cellValue = value;
        } else {
          cellValue = "";
        }
        return cellValue;
      }
    }
  }, []);
};
/* eslint-enable react-hooks/exhaustive-deps */
