import { number, object, ObjectSchema } from "yup";
import { TeacherShift } from "./appendix2Type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/functions";

export const teacherShiftFormSchema: ObjectSchema<TeacherShift> = object({
  id: number().optional(),
  shift: stringField(validationMessages.required),
  section: stringField(validationMessages.required),
  boyNumber: number()
    .min(0, "El valor debe ser mayor o igual a cero")
    .required(validationMessages.required),
  girlNumber: number()
    .min(0, "El valor debe ser mayor o igual a cero")
    .required(validationMessages.required),
  boyDisabilityNumber: number()
    .min(0, "El valor debe ser mayor o igual a cero")
    .required(validationMessages.required),
  girlDisabilityNumber: number()
    .min(0, "El valor debe ser mayor o igual a cero")
    .required(validationMessages.required),
  experienceYear: stringField(validationMessages.required)
});
