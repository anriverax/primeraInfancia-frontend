import { parseCustomDateFormat } from "@/shared/utils/functions";
import { AgendaTableType } from "../../agenda.type";

interface EventCustomData {
  color: string;
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const useAgendaCalendar = (agendaList: never[] | AgendaTableType[]): { events: EventCustomData[] } => {
  const events = agendaList
    .map((event) => {
      const parsedDate = parseCustomDateFormat(event.start);
      if (!parsedDate) return null;

      return {
        id: event.id,
        title: `${event.title}`,
        start: parsedDate,
        end: parsedDate,
        color: event.color
      };
    })
    .filter((event): event is EventCustomData => event !== null);

  return { events };
};

export { useAgendaCalendar };
