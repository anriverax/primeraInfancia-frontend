import { Button, Input, Radio, RadioGroup, Select, SelectItem, SharedSelection } from "@heroui/react";
import { AppendixCard } from "../../component/appendixCard";
import { useTeacherShiftForm, UseTeacherShiftFormProps } from "../hook/useTeacherShiftForm";
import { experienceYearData, sectionData, shiftData } from "../appendix2Data";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { IOptions } from "@/shared/types/globals";
import TeacherShiftTable from "./table/teacherShiftTable";
import { useCallback } from "react";

const TeacherShiftForm = ({
  setFieldValue,
  teacherShiftData,
  setAnswers
}: UseTeacherShiftFormProps): React.JSX.Element => {
  const formikGeneral = useTeacherShiftForm({ setFieldValue, teacherShiftData, setAnswers });

  const { getFieldProps, touched, errors, handleSubmit, values } = formikGeneral;
  const { getInputProps, getSelectProps } = useCustomFormFields();

  /* eslint-disable react-hooks/exhaustive-deps */
  const onDeleteTeacherShift = useCallback(
    (id: number) => {
      const result = teacherShiftData.filter((entry) => entry.id && entry.id !== id);
      setFieldValue("teacherShiftTable", result);
    },
    [teacherShiftData]
  );
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <AppendixCard step="II" title="Datos generales del docente">
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
              <Select
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
          <RadioGroup
            isRequired
            label="Años de experiencia en docencia"
            orientation="horizontal"
            value={values.experienceYear}
            isInvalid={!!errors.experienceYear}
            errorMessage={errors.experienceYear}
            onValueChange={(value: string) => formikGeneral.setFieldValue("experienceYear", value)}
          >
            {experienceYearData.map((option) => (
              <Radio key={option.key} value={option.label}>
                {option.label}
              </Radio>
            ))}
          </RadioGroup>
          <div>
            <TeacherShiftTable items={teacherShiftData} onDelete={onDeleteTeacherShift} />
          </div>
        </div>
        <div className="mt-6">
          <Button className="w-full bg-primary-100" type="submit">
            Agregar
          </Button>
        </div>
      </AppendixCard>
    </form>
  );
};

export default TeacherShiftForm;
