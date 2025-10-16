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
import { useAttendanceForm } from "../../hook/useAttendanceForm";
import { useAttendanceNew } from "../../hook/useAttendanceNew";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { IEvent, TeachersAssignmentMentor } from "../../attendance.type";
import { AttendanceEnum, AttendanceModeEnum } from "@/shared/constants";
import CustomProgress from "@/shared/ui/custom/customProgress";

const MentorForm = (): React.JSX.Element => {
  const formik = useAttendanceForm();
  const { getSelectProps, getTextAreaProps, getInputProps } = useCustomFormFields();

  const { values, touched, errors, getFieldProps, handleSubmit, setFieldValue } = formik;

  const { assignmentList, handleSelectionChange, getErrorTeacher } = useAttendanceNew({
    eventId: values.eventId,
    setFieldValue
  });
  if (!assignmentList) return <CustomProgress />;

  return (
    <div className="border border-t-4 border-t-primary-300 rounded-2xl border-gray-200 bg-white p-6 w-1/2">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Select
          items={assignmentList.events}
          name="eventId"
          {...getSelectProps(
            "Evento",
            "Seleccione un evento",
            assignmentList.events.length || 0,
            values.eventId,
            errors.eventId
          )}
          onSelectionChange={(keys: SharedSelection) => {
            const selected = Array.from(keys as Set<string>)[0];
            const id = selected ? Number(selected) : -1;
            setFieldValue("eventId", id);
            setFieldValue("teacherId", []);
          }}
        >
          {assignmentList.events.map((event: IEvent) => (
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
        <Select
          items={assignmentList.teachers}
          {...getSelectProps(
            "Cuerpo docente",
            "Seleccione uno o más docentes",
            assignmentList.teachers.length || 0,
            values.teacherId ?? [],
            getErrorTeacher(errors.teacherId)
          )}
          isDisabled={!assignmentList.teachers.length || !values.eventId}
          selectionMode="multiple"
          selectedKeys={values.teacherId?.map((v: number) => v.toString()) ?? []}
          onSelectionChange={(keys: SharedSelection) => handleSelectionChange(keys)}
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
            />
          </div>
        )}
        <Button fullWidth color="primary" variant="shadow" type="submit">
          Iniciar jornada
        </Button>
      </form>
    </div>
  );
};

export default MentorForm;
