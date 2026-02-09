import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import React, { useState } from "react";
import { messages } from "./agendaCalendar.util";
import { useAgendaCalendar } from "./hook/useAgendaCalendar";
import { AgendaTableType } from "../agenda.type";

moment.locale("es");

type AgendaCalendarProps = {
  agendaList: never[] | AgendaTableType[];
};

const AgendaCalendar = ({ agendaList }: AgendaCalendarProps): React.JSX.Element => {
  const { events } = useAgendaCalendar(agendaList);
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const mLocalizer = momentLocalizer(moment);
  {
    /* eslint-disable @typescript-eslint/no-explicit-any */
  }
  return (
    <div className="h-[900px] w-full">
      <Calendar
        popup
        localizer={mLocalizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        view={view}
        date={date}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        messages={messages}
        eventPropGetter={(event: any) => ({
          style: {
            backgroundColor: `rgba(${event.color}, 0.1)`,
            color: `rgb(${event.color})`
          }
        })}
        onView={setView}
        onNavigate={setDate}
      />
    </div>
  );
  {
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
};

export default AgendaCalendar;
