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

import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";

import { AttendanceEnum, AttendanceModeEnum } from "@/shared/constants";

import { useState, useMemo, useEffect } from "react";
import { useDebouncedValue } from "@/shared/hooks/useDebouncedValue";
import { useAttendanceForm } from "./hook/useAttendanceForm";
import { useEventList } from "@/components/attendance/hook/useEventList";
import { useAttendanceUtils } from "@/components/attendance/hook/usAttendance.utils";
import { useSupportList } from "./hook/useSupportList";
import { IEvent, SupportList } from "./attendance.type";
import { useTeachersList } from "./hook/useTeachersList";

const AttendanceForm = (): React.JSX.Element => {
  const [searchTeacher, setSearchTeacher] = useState<string>("");
  const { debouncedValue, isPending } = useDebouncedValue(searchTeacher, { delay: 300 });

  const formik = useAttendanceForm();
  const { getSelectProps, getTextAreaProps, getInputProps } = useCustomFormFields();
  const { values, touched, errors, getFieldProps, handleSubmit, setFieldValue } = formik;

  const { supportList } = useSupportList(values.isResponsible);

  useEffect(() => {
    if (supportList.length === 1) {
      setFieldValue("supportId", supportList[0].id);
    }
  }, [supportList, setFieldValue]);

  const { assignmentList } = useEventList(values.supportId.toString());
  const { teachersList } = useTeachersList(values.supportId.toString());

  const { handleSelectionChange } = useAttendanceUtils({
    eventInstanceId: values.eventInstanceId,
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

  return (
    <div className="grid grid-cols-2 gap-12">
      <div className="border border-t-4 border-t-primary-300 rounded-2xl border-gray-200 bg-white p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <RadioGroup
            isRequired
            label="Eres el responsable del evento?"
            orientation="horizontal"
            value={values.isResponsible}
            isInvalid={!!errors.isResponsible}
            errorMessage={errors.isResponsible}
            onValueChange={(value: string) => setFieldValue("isResponsible", value)}
          >
            <Radio value="true" color="primary">
              Si
            </Radio>
            <Radio value="false" color="primary">
              No
            </Radio>
          </RadioGroup>
          <Select
            items={supportList ?? []}
            name="supportId"
            scrollShadowProps={{
              hideScrollBar: false
            }}
            {...getSelectProps(
              "Responsable",
              "Seleccione responsable del evento",
              supportList.length ?? 0,
              values.supportId,
              errors.supportId
            )}
            isDisabled={supportList.length <= 1}
            onSelectionChange={(keys: SharedSelection) => {
              const selected = Array.from(keys as Set<string>)[0];
              const id = selected ? Number(selected) : -1;
              setFieldValue("supportId", id);
              setFieldValue("eventInstanceId", -1);
              setFieldValue("teacherId", []);
            }}
          >
            {(supportList ?? []).map((support: SupportList) => (
              <SelectItem key={support.id}>{support.fullName}</SelectItem>
            ))}
          </Select>
          <Select
            items={assignmentList ?? []}
            name="eventInstanceId"
            scrollShadowProps={{
              hideScrollBar: false
            }}
            {...getSelectProps(
              "Evento",
              "Seleccione un eventos",
              assignmentList.length ?? 0,
              values.eventInstanceId,
              errors.eventInstanceId
            )}
            onSelectionChange={(keys: SharedSelection) => {
              const selected = Array.from(keys as Set<string>)[0];
              const id = selected ? Number(selected) : -1;
              setFieldValue("eventInstanceId", id);
              setFieldValue("teacherId", []);
            }}
          >
            {(assignmentList ?? []).map((event: IEvent) => (
              <SelectItem key={event.id}>{event.name}</SelectItem>
            ))}
          </Select>
          <div className="flex justify-between gap-4">
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
          </div>

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

          <div className="w-full  border-small px-1 py-2 rounded-small border-default-200">
            <Listbox
              disallowEmptySelection
              classNames={{
                list: "max-h-[250px] overflow-y-auto"
              }}
              emptyContent="No tiene docentes asignados"
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
                      {...getInputProps(
                        "text",
                        "Buscar docente por nombre",
                        undefined,
                        undefined,
                        false
                      )}
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

          <Button fullWidth color="primary" type="submit">
            Agregar docentes
          </Button>
        </form>
      </div>
      <div className="border border-t-4 border-t-success-300 rounded-2xl border-gray-200 bg-white"></div>
    </div>
  );
};

export default AttendanceForm;
