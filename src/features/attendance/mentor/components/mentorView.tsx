import { Button, RadioGroup, Radio, Select, SelectItem } from "@heroui/react";
import { useAttendanceList } from "../../hook/useAttendanceList";
import { IEvent } from "../../attendance.type";
import { useAttendanceForm } from "../../hook/useAttendanceForm";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { CheckCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import ListTeacher from "./listTeacher";
import { useMentor } from "../../hook/useMentor";
import { AttendanceEnum } from "@/shared/constants";

const MentorView = (): React.JSX.Element => {
  const { eventList, attendance } = useAttendanceList();
  const formik = useAttendanceForm(attendance ? attendance.id : 0);
  const { data: session } = useSession();
  useMentor();
  const { values, touched, errors, getFieldProps, handleSubmit } = formik;
  const { getSelectProps } = useCustomFormFields();

  /* eslint-disable react-hooks/exhaustive-deps */
  const attendanceDetails = useMemo(() => {
    if (attendance) {
      return (
        <div className="bg-white border border-blue-100">
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
                <Button fullWidth color="secondary" onPress={() => handleSubmit()}>
                  Finalizar Jornada
                </Button>
              )}
            </li>
          </ul>
        </div>
      );
    }
  }, [attendance, session]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div className="flex justify-center xl:gap-6">
      {!attendance && (
        <div className="border border-t-4 border-t-primary-300 rounded-2xl border-gray-200 bg-white p-6 w-1/2">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
            <RadioGroup label="Seleccione una opción" orientation="horizontal">
              <Radio value={AttendanceEnum.PRESENTE} color="primary">
                {AttendanceEnum.PRESENTE}
              </Radio>
              <Radio value={AttendanceEnum.PERMISO} color="secondary">
                {AttendanceEnum.PERMISO}
              </Radio>
              <Radio value={AttendanceEnum.AUSENTE} color="danger">
                {AttendanceEnum.AUSENTE}
              </Radio>
            </RadioGroup>
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
              fullWidth
              color="primary"
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
      {attendance && <ListTeacher attendance={attendance} />}
    </div>
  );
};

export default MentorView;
