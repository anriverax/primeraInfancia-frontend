import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  SharedSelection,
  Textarea
} from "@heroui/react";
import { useAttendanceForm } from "../../../components/attendance/hook/useAttendanceForm";
import { useAttendanceNew } from "../../../components/attendance/hook/usAttendance.utils";
import { useCustomFormFields } from "@/shared/hooks/form/useCustomFormFields";
import { IEvent } from "../../../components/attendance/attendance.type";
import { AttendanceEnum, AttendanceModeEnum } from "@/shared/constants";
import CustomProgress from "@/shared/ui/custom/customProgress";
import { useSession } from "next-auth/react";
import { TypeRole } from "@/shared/constants";

const MentorForm = (): React.JSX.Element => {
  const { data: session } = useSession();
  const role = session?.user.role;

  const formik = useAttendanceForm(role);
  const { getSelectProps, getTextAreaProps, getInputProps } = useCustomFormFields();

  const { values, touched, errors, getFieldProps, handleSubmit, setFieldValue } = formik;

  const { assignmentList, mentors } = useAttendanceNew({
    eventId: values.eventId,
    setFieldValue,
    rol: role,
    mentorId: values.mentorId as number
  });

  // Loading gates: si es mentor, esperamos directamente el listado; si es técnico, primero mentores
  if (!assignmentList && !mentors) return <CustomProgress />;

  return (
    <div className="border border-t-4 border-t-primary-300 rounded-2xl border-gray-200 bg-white p-6 w-full md:w-3/4 lg:w-1/2">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {role === TypeRole.USER_TECNICO_APOYO && (
          <Select
            items={mentors ?? []}
            name="mentorId"
            {...getSelectProps(
              "Mentor",
              "Seleccione un mentor",
              mentors?.length || 0,
              values.mentorId as number,
              errors.mentorId
            )}
            onSelectionChange={(keys: SharedSelection) => {
              const selected = Array.from(keys as Set<string>)[0];
              const id = selected ? Number(selected) : -1;
              setFieldValue("mentorId", id);
              setFieldValue("eventId", -1);
              setFieldValue("teacherId", []);
            }}
          >
            {(mentors ?? []).map((m) => (
              <SelectItem key={m.id}>{m.fullName}</SelectItem>
            ))}
          </Select>
        )}

        <Select
          items={assignmentList ?? []}
          name="eventId"
          scrollShadowProps={{
            hideScrollBar: false
          }}
          {...getSelectProps(
            "Evento",
            "Seleccione un eventosss",
            assignmentList.length || 0,
            values.eventId,
            errors.eventId
          )}
          isDisabled={role === TypeRole.USER_TECNICO_APOYO && !assignmentList}
          onSelectionChange={(keys: SharedSelection) => {
            const selected = Array.from(keys as Set<string>)[0];
            const id = selected ? Number(selected) : -1;
            setFieldValue("eventId", id);
            setFieldValue("teacherId", []);
          }}
        >
          {(assignmentList ?? []).map((event: IEvent) => (
            <SelectItem key={event.id}>{event.name}</SelectItem>
          ))}
        </Select>
        <RadioGroup
          isRequired
          label="Seleccione una modalidad"
          orientation="horizontal"
          value={values.modality}
          isInvalid={!!errors.modality}
          errorMessage={errors.modality}
          onValueChange={(value: string) => setFieldValue("modality", value)}
        >
          <Radio value={AttendanceModeEnum.PRESENCIAL} color="primary">
            {AttendanceModeEnum.PRESENCIAL}
          </Radio>
          <Radio value={AttendanceModeEnum.VIRTUAL} color="primary">
            {AttendanceModeEnum.VIRTUAL}
          </Radio>
        </RadioGroup>
        {/*        <Select
          items={assignmentList?.teachers ?? []}
          {...getSelectProps(
            "Cuerpo docente",
            "Seleccione uno o más docentes",
            assignmentList?.teachers?.length || 0,
            values.teacherId ?? [],
            getErrorTeacher(errors.teacherId)
          )}
          isDisabled={!(assignmentList?.teachers?.length || 0) || !values.eventId}
          selectionMode="multiple"
          selectedKeys={values.teacherId?.map((v: number) => v.toString()) ?? []}
          onSelectionChange={(keys: SharedSelection) => handleSelectionChange(keys)}
        >
          {(assignmentList?.teachers ?? []).map((teacher: TeachersAssignmentMentor) => (
            <SelectItem key={teacher.id} textValue={teacher.fullName}>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{teacher.fullName}</span>
                  <span className="text-tiny text-default-400">{teacher.School.name}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </Select>*/}
        <RadioGroup
          label="Seleccione una opción"
          orientation="horizontal"
          value={values.status}
          onValueChange={(value: string) => {
            setFieldValue("comment", "");
            setFieldValue("justificationUrl", "");
            setFieldValue("status", value);
          }}
        >
          <Radio value={AttendanceEnum.PRESENTE} color="primary">
            {AttendanceEnum.PRESENTE}
          </Radio>
          <Radio value={AttendanceEnum.AUSENTE} color="danger">
            {AttendanceEnum.AUSENTE}
          </Radio>
        </RadioGroup>
        {values.status?.toString() === AttendanceEnum.AUSENTE && (
          <div className="space-y-6">
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
              {...getFieldProps("justificationUrl")}
              {...getInputProps(
                "url",
                "Url de justificación",
                touched.justificationUrl,
                errors.justificationUrl
              )}
              description="Ejemplos: https://oei365-my.sharepoint.com/... ó https://oei365.sharepoint.com/..."
            />
          </div>
        )}
        <Button fullWidth color="primary" type="submit">
          Iniciar jornada
        </Button>
      </form>
    </div>
  );
};

export default MentorForm;
