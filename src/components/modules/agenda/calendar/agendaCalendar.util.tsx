import { ChevronLeft, ChevronRight } from "lucide-react";

export const messages = {
  previous: (
    <span>
      <ChevronLeft className="w-[19px] h-[19px]" />
    </span>
  ),
  next: (
    <span>
      <ChevronRight className="w-[19px] h-[19px]" />
    </span>
  ),
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  allDayEvent: "Evento de día completo",
  showMore: (total: number): string => `+ ${total} más`
};
