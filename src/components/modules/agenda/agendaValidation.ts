import { array, number, object, ObjectSchema, string } from "yup";
import { AgendaStepOneInput, AgendaStepTwoInput } from "./agenda.type";
import { validationMessages } from "@/shared/constants";
/* eslint-disable @typescript-eslint/no-explicit-any */
const startField: any = object()
  .required("Seleccione una fecha de seguimiento")
  .test("is-valid-date", "Formato de fecha inválido", (value: any) => {
    return value && typeof value === "object" && "year" in value;
  })
  .test("is-future-date", "La fecha no puede ser en el pasado", (value: any) => {
    if (!value?.year || !value?.month || !value?.day) return false;
    const date = new Date(value.year, value.month - 1, value.day, value.hour || 0, value.minute || 0);
    return date >= new Date();
  })
  .test(
    "has-time",
    "Debe incluir hora y minutos",
    (value: any) => value?.hour !== undefined && value?.minute !== undefined
  );
/* eslint-enable @typescript-eslint/no-explicit-any */
export const agendaFormStepOneSchema: ObjectSchema<AgendaStepOneInput> = object({
  trainingModuleId: number()
    .required(validationMessages.selectRequired)
    .notOneOf([-1], validationMessages.required),
  eventInstanceId: number()
    .required(validationMessages.selectRequired)
    .notOneOf([-1], validationMessages.required),
  start: startField,
  description: string().optional()
}) as ObjectSchema<AgendaStepOneInput>;

export const agendaFormStepTwoSchema: ObjectSchema<AgendaStepTwoInput> = object({
  plannedEventId: number()
    .required(validationMessages.required)
    .notOneOf([-1], "Debe seleccionar al menos un docente"),
  teacherIds: array()
    .of(number().required())
    .min(1, "Debe seleccionar al menos un docente")
    .required(validationMessages.required)
});
