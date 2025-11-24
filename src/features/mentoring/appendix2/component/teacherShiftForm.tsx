import { Button, Input, Radio, RadioGroup, Select, SelectItem, SharedSelection } from "@heroui/react";
import { AppendixCard } from "../../component/appendixCard";
import { useTeacherShiftForm, UseTeacherShiftFormProps } from "../hook/useTeacherShiftForm";
import { experienceYearData, sectionData, shiftData } from "../appendix2Data";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { IOptions } from "@/shared/types/globals";
import TeacherShiftTable from "./table/teacherShiftTable";
import { useCallback } from "react";
import { useMemo } from "react";

const TeacherShiftForm = ({
  setFieldValue,
  teacherShiftData,
  setAnswers
}: UseTeacherShiftFormProps): React.JSX.Element => {
  const formikGeneral = useTeacherShiftForm({ setFieldValue, teacherShiftData, setAnswers });

  const { getFieldProps, touched, errors, handleSubmit, values } = formikGeneral;
  const { getInputProps, getSelectProps } = useCustomFormFields();

  // unique correlativo counter for rows (seq). Initialize to max existing seq + 1
  // const seqRef = useRef<number>(Date.now());
  // useEffect(() => {
  //   const maxSeq = Array.isArray(teacherShiftData)
  //     ? teacherShiftData.reduce((m, e) => Math.max(m, Number(e?.seq ?? 0)), 0)
  //     : 0;
  //   seqRef.current = maxSeq > 0 ? maxSeq + 1 : Date.now();
  // }, [teacherShiftData]);
  // NOTE: We use `id` field (number) as unique identifier for rows (no seq)

  // NOTE: Removed automatic sync to parent form.
  // experienceYear remains local/optional here so "Agregar" doesn't require it.
  // Appendix2Form still declares experienceYear as required in its validation schema,
  // so the parent form will require it when submitting the full form.

  /* eslint-disable react-hooks/exhaustive-deps */
  const onDeleteTeacherShift = useCallback(
    (identifier: number | string) => {
      const idNumber = Number(identifier);
      const items = Array.isArray(teacherShiftData) ? teacherShiftData : [];

      const idx = items.findIndex((entry) => Number((entry as any)?.id) === idNumber);
      if (idx === -1) return; // no match

      const next = [...items.slice(0, idx), ...items.slice(idx + 1)];
      setFieldValue("teacherShiftTable", next);

      if (typeof setAnswers === "function") {
        const answersPayload = next.map((entry, i) => ({
          index: i,
          question: "teacherShiftTable",
          answer: entry
        }));
        setAnswers(answersPayload as unknown as any);
      }
    },
    [teacherShiftData, setFieldValue, setAnswers]
  );
  /* eslint-enable react-hooks/exhaustive-deps */

  // handler para "Agregar" que NO dispara la validación del form principal
  const handleAddRow = useCallback(() => {
    // generar id único (timestamp + random para minimizar colisiones)
    const newId = Date.now() + Math.floor(Math.random() * 1000);
    const newEntry = {
      id: newId,
      shift: values.shift ?? "",
      section: values.section ?? "",
      boyNumber: Number(values.boyNumber ?? 0),
      girlNumber: Number(values.girlNumber ?? 0),
      boyDisabilityNumber: Number(values.boyDisabilityNumber ?? 0),
      girlDisabilityNumber: Number(values.girlDisabilityNumber ?? 0),
      // experienceYear es opcional aquí; no bloquea "Agregar"
      experienceYear: values.experienceYear ?? undefined
    };

    const next = [...(teacherShiftData ?? []), newEntry];
    // actualizar formik tabla y estado local si existe
    setFieldValue("teacherShiftTable", next);
    if (typeof setAnswers === "function") {
      // map TeacherShift[] to the IAnswerTeacherShift[] shape expected by the parent
      const answersPayload = next.map((entry, idx) => ({
        index: idx,
        question: "teacherShiftTable",
        // include seq so parent can identify rows
        answer: entry
      }));
      // cast to satisfy the parent's expected type
      setAnswers(answersPayload as unknown as any);
    }

    // limpiar campos de la fila (no tocar experienceYear)
    setFieldValue("shift", "");
    setFieldValue("section", "");
    setFieldValue("boyNumber", 0);
    setFieldValue("girlNumber", 0);
    setFieldValue("boyDisabilityNumber", 0);
    setFieldValue("girlDisabilityNumber", 0);
  }, [values, teacherShiftData, setFieldValue, setAnswers]);

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <AppendixCard step="I" title="Datos generales del docente">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <RadioGroup
                isRequired
                label="Turno"
                orientation="horizontal"
                value={values.shift}
                isInvalid={!!errors.shift}
                errorMessage={errors.shift}
                onValueChange={(value: string) => formikGeneral.setFieldValue("shift", value)}
              >
                {shiftData.map((option) => (
                  <Radio key={option.key} value={option.label}>
                    {option.label}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
            <div>
              {/* eslint-disable @typescript-eslint/no-explicit-any */}
              {/* <Select
                items={sectionData}
                name="section"
                {...getSelectProps(
                  "Nivel educativo que atiende:",
                  "Seleccione el nivel",
                  sectionData.length || 0,
                  values.section as any,
                  errors.section
                )}
                onSelectionChange={(keys: SharedSelection) => {
                  const selected = Array.from(keys as Set<string>)[0];
                  const id = selected;
                  formikGeneral.setFieldValue("section", id);
                }}
              >
                {sectionData.map((event: IOptions) => (
                  <SelectItem key={event.key}>{event.label}</SelectItem>
                ))}
              </Select> */}
              <Select
                selectionMode="multiple"
                items={sectionData}
                name="section"
                {...getSelectProps(
                  "Nivel educativo que atiende:",
                  "Seleccione el nivel",
                  sectionData.length || 0,
                  values.section as any,
                  errors.section
                )}
                onSelectionChange={(keys: SharedSelection) => {
                  // keys viene como Set<string> cuando selectionMode="multiple"
                  const selected = Array.from(keys as Set<string>);
                  // opcional: obtener labels en lugar de keys
                  // const selectedLabels = selected.map(k => sectionData.find(s => s.key === k)?.label ?? k);
                  // guardar en formik el array de keys (o labels según prefieras)
                  formikGeneral.setFieldValue("section", selected);
                }}
              >
                {sectionData.map((event: IOptions) => (
                  <SelectItem key={event.key}>
                    {event.label}
                  </SelectItem>
                ))}
              </Select>
              {/* eslint-enable @typescript-eslint/no-explicit-any */}
            </div>
            <div>
              <Input
                {...getFieldProps("boyNumber")}
                {...getInputProps(
                  "number",
                  "Total de niños atendidos",
                  touched.boyNumber,
                  errors.boyNumber
                )}
              />
            </div>
            <div>
              <Input
                {...getFieldProps("girlNumber")}
                {...getInputProps(
                  "number",
                  "Total de niñas atendidas",
                  touched.girlNumber,
                  errors.girlNumber
                )}
              />
            </div>
            <div>
              <Input
                {...getFieldProps("boyDisabilityNumber")}
                {...getInputProps(
                  "number",
                  "Niños con discapacidad diagnosticada",
                  touched.boyDisabilityNumber,
                  errors.boyDisabilityNumber
                )}
              />
            </div>
            <div>
              <Input
                {...getFieldProps("girlDisabilityNumber")}
                {...getInputProps(
                  "number",
                  "Niñas con discapacidad diagnosticada",
                  touched.girlDisabilityNumber,
                  errors.girlDisabilityNumber
                )}
              />
            </div>
          </div>
          <div>
            {Array.isArray(teacherShiftData) && teacherShiftData.length > 0 && (
              // TeacherShiftTable debe eliminar filas usando el correlativo `seq`
              <TeacherShiftTable items={teacherShiftData} onDelete={onDeleteTeacherShift} />
            )}
          </div>
        </div>
        <div className="mt-6 mb-4">
          <Button className="w-full bg-primary-100" type="button" onClick={handleAddRow}>
            Agregar
          </Button>
        </div>
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <RadioGroup
              isRequired
              label="Años de experiencia en docencia"
              orientation="horizontal"
              value={values.experienceYear}
              isInvalid={!!errors.experienceYear}
              errorMessage={errors.experienceYear}
              onValueChange={(value: string) => {
                // actualizar form local
                formikGeneral.setFieldValue("experienceYear", value);
                // sincronizar con el form padre (Appendix2Form) para que sea requerido al submit
                if (typeof setFieldValue === "function") {
                  setFieldValue("experienceYear", value);
                }
              }}
            >
              {experienceYearData.map((option) => (
                <Radio key={option.key} value={option.label}>
                  {option.label}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </div>
      </AppendixCard>
    </form>
  );
};

export default TeacherShiftForm;
