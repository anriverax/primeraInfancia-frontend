import {
  Button,
  Input,
  Listbox,
  ListboxItem,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  SharedSelection,
  Textarea
} from "@heroui/react";
import { useAttendanceForm } from "../hook/useAttendanceForm";
import { useAttendanceNew } from "../hook/useAttendanceNew";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { IEvent } from "../attendance.type";
import { AttendanceEnum, AttendanceModeEnum } from "@/shared/constants";
import CustomProgress from "@/shared/ui/custom/customProgress";
import { useSession } from "next-auth/react";
import { TypeRole } from "@/shared/constants";
import { useEventList } from "../hook/useEventList";
import { useTeachersList } from "../hook/useTeachersList";
import { useState, useMemo } from "react";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";

const AttendanceForm = (): React.JSX.Element => {
  const { data: session } = useSession();
  const role = session?.user.role;

  const [searchTeacher, setSearchTeacher] = useState<string>("");
  const { debouncedValue, isPending } = useDebouncedValue(searchTeacher, { delay: 300 });

  const formik = useAttendanceForm(role);
  const { getSelectProps, getTextAreaProps, getInputProps } = useCustomFormFields();

  const { values, touched, errors, getFieldProps, handleSubmit, setFieldValue } = formik;

  const { assignmentList } = useEventList();
  const { teachersList } = useTeachersList();

  const { handleSelectionChange } = useAttendanceNew({
    eventId: values.eventId,
    setFieldValue,
    assignmentList
  });

  const filteredTeachers = useMemo(() => {
    if (!teachersList) return [];
    if (!debouncedValue.trim()) return teachersList;

    const searchLower = debouncedValue.toLowerCase();
    return teachersList.filter((teacher) => teacher.fullName.toLowerCase().includes(searchLower));
  }, [teachersList, debouncedValue]);

  // Loading gates: si es mentor, esperamos directamente el listado; si es técnico, primero mentores
  if (!assignmentList) return <CustomProgress />;

  return (
    <div className='grid grid-cols-2'>
      <div className="border border-t-4 border-t-primary-300 rounded-2xl border-gray-200 bg-white p-6 w-full">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Select
            items={assignmentList ?? []}
            name="eventId"
            scrollShadowProps={{
              hideScrollBar: false
            }}
            {...getSelectProps(
              "Evento",
              "Seleccione un eventos",
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
          {teachersList && (
            <div className="w-full  border-small px-1 py-2 rounded-small border-default-200">
              <Listbox
                disallowEmptySelection
                classNames={{
                  list: "max-h-[300px] overflow-y-auto"
                }}
                items={filteredTeachers}
                selectedKeys={new Set(Array.from(values.teacherId || []).map(String))}
                aria-label="Dynamic Actions"
                selectionMode="multiple"
                topContent={
                  <div>
                    <div className="mb-3">
                      <Input
                        isClearable
                        value={searchTeacher}
                        description={isPending ? "Buscando..." : isPending}
                        {...getInputProps("text", "Buscar docente por nombre", undefined, undefined)}
                        onValueChange={setSearchTeacher}
                      />
                    </div>
                    <p className="font-bold text-gray-600 text-sm">Docentes activos</p>
                  </div>
                }
                onSelectionChange={(keys: SharedSelection) => handleSelectionChange(keys)}
              >
                {(item) => (
                  <ListboxItem key={item.id}>
                    <ul>
                      <li>{item.fullName}</li>
                      <li className="text-default-400 text-xs">{item.School.name}</li>
                    </ul>
                  </ListboxItem>
                )}
              </Listbox>
            </div>
          )}
          <Button fullWidth color="primary" type="submit">
            Agregar docentes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AttendanceForm;
