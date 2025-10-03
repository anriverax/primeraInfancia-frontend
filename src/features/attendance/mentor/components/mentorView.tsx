import { Button, RadioGroup, Radio, Select, SelectItem, Textarea, Input } from "@heroui/react";
import { useAttendanceList } from "../../hook/useAttendanceList";
import { IEvent, TeachersAssignmentMentor } from "../../attendance.type";
import { useAttendanceForm } from "../../hook/useAttendanceForm";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { useMentor } from "../../hook/useMentor";
import { AttendanceEnum, AttendanceModeEnum } from "@/shared/constants";

const MentorView = (): React.JSX.Element => {
  const assignmentList = useAttendanceList();
  const formik = useAttendanceForm(0);
  useMentor();
  const { values, touched, errors, getFieldProps, handleSubmit, setFieldValue } = formik;
  const { getSelectProps, getTextAreaProps, getInputProps } = useCustomFormFields();

  return (
    <div className="flex justify-center xl:gap-6">
      {assignmentList !== undefined && (
        <div className="border border-t-4 border-t-primary-300 rounded-2xl border-gray-200 bg-white p-6 w-1/2">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Select
              items={assignmentList.events}
              {...getSelectProps(
                "Evento",
                "Seleccione un evento",
                assignmentList.events.length || 0,
                values.eventId,
                touched.eventId,
                errors.eventId
              )}
              {...getFieldProps("eventId")}
              isDisabled={!assignmentList.events.length}
            >
              {assignmentList.events.map((event: IEvent) => (
                <SelectItem key={event.id}>{event.name}</SelectItem>
              ))}
            </Select>
            <RadioGroup
              label="Seleccione una modalidad"
              orientation="horizontal"
              value={values.modality}
              onValueChange={(value: string) => setFieldValue("modality", value)}
            >
              <Radio value={AttendanceModeEnum.PRESENCIAL} color="primary">
                {AttendanceModeEnum.PRESENCIAL}
              </Radio>
              <Radio value={AttendanceModeEnum.VIRTUAL} color="primary">
                {AttendanceModeEnum.VIRTUAL}
              </Radio>
            </RadioGroup>
            <Select
              items={assignmentList.teachers}
              {...getSelectProps(
                "Cuerpo docente",
                "Seleccione uno o más docentes",
                assignmentList.teachers.length || 0,
                values.teacherId,
                touched.teacherId,
                errors.teacherId
              )}
              {...getFieldProps("teacherId")}
              isDisabled={!assignmentList.teachers.length}
            >
              {assignmentList.teachers.map((teacher: TeachersAssignmentMentor) => (
                <SelectItem key={teacher.id} textValue={teacher.fullName}>
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col">
                      <span className="text-small">{teacher.fullName}</span>
                      <span className="text-tiny text-default-400">{teacher.School.name}</span>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </Select>
            <RadioGroup
              label="Seleccione una opción"
              orientation="horizontal"
              value={values.status}
              onValueChange={(value: string) => setFieldValue("status", value)}
            >
              <Radio value={AttendanceEnum.PRESENTE} color="primary">
                {AttendanceEnum.PRESENTE}
              </Radio>
              <Radio value={AttendanceEnum.AUSENTE} color="danger">
                {AttendanceEnum.AUSENTE}
              </Radio>
            </RadioGroup>
            {values.status?.toString() === AttendanceEnum.AUSENTE && (
              <div>
                <Textarea
                  {...getTextAreaProps(
                    "Comentarios",
                    "Escriba un comentario...",
                    touched.comment,
                    errors.comment
                  )}
                  {...getFieldProps("comment")}
                />
                <Input
                  {...getInputProps(
                    "url",
                    "Url de justificación",
                    touched.justificationUrl,
                    errors.justificationUrl
                  )}
                />
              </div>
            )}
            <Button
              fullWidth
              color="primary"
              variant="shadow"
              type="submit"
              isDisabled={values.eventId > 0 ? false : true}
            >
              Iniciar jornada
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MentorView;
