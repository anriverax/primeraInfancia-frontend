import { Button, Select, SelectItem } from "@heroui/react";
import { useAttendanceList } from "../../hook/useAttendanceList";
import { IEvent } from "../../attendance.type";
import { useAttendanceForm } from "../../hook/useAttendanceForm";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { CheckCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const LeaderView = () => {
  const formik = useAttendanceForm();
  const { eventList, attendance } = useAttendanceList();
  const { data: session } = useSession();

  const { values, touched, errors, getFieldProps, handleSubmit } = formik;
  const { getSelectProps } = useCustomFormFields();

  const attendanceDetails = useMemo(() => {
    if (attendance) {
      return (
        <div>
          <div className="bg-white border border-gray-200">
            <div className="p-6 flex items-center gap-2 bg-blue-50 text-blue-500">
              <CheckCircle className="h-5 w-5" />
              <h3 className="text-2xl font-semibold">Información</h3>
            </div>
            <ul className="p-6 space-y-4 grid grid-cols-2">
              <li>
                <p className="font-bold">Evento</p>
                <span>{attendance.Event?.name}</span>
              </li>
              <li>
                <p className="font-bold">Formador</p>
                {session ? <span>{session.user.name}</span> : <span>Cargando...</span>}
              </li>
              <li>
                <p className="font-bold">Inicio de Jornada</p>
                <span>{attendance.checkIn}</span>
              </li>
              <li>
                <p className="font-bold">Finalización de Jornada</p>
                {attendance.checkOut ? (
                  <span>{attendance.checkIn}</span>
                ) : (
                  <Button color="secondary" fullWidth type="submit">
                    Finalizar Jornada
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }, [attendance]);

  return (
    <div className="space-y-8">
      <div className="flex w-full gap-3 justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-900">📋 Control de Asistencia</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-6">
        {!attendance && (
          <div className="flex justify-between">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Select
                items={eventList ? eventList : []}
                {...getSelectProps(
                  "Evento",
                  "Seleccione un evento",
                  eventList ? eventList.length : 0,
                  values.eventId,
                  touched.eventId,
                  errors.eventId
                )}
                {...getFieldProps("eventId")}
                isDisabled={attendance ? true : false}
              >
                {eventList.map((event: IEvent) => (
                  <SelectItem key={event.id}>{event.name}</SelectItem>
                ))}
              </Select>
              <Button
                color="primary"
                fullWidth
                variant="shadow"
                type="submit"
                isDisabled={attendance ? true : false}
              >
                Iniciar jornada
              </Button>
            </form>
          </div>
        )}
        {attendanceDetails}
      </div>
    </div>
  );
};

export default LeaderView;
