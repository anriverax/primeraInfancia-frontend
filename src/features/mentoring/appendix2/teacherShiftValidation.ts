import { number, object, ObjectSchema, mixed } from "yup";
import { TeacherShift } from "./appendix2Type";
import { validationMessages } from "@/shared/constants";
import { stringField, stringOptionalField } from "@/shared/utils/functions";

export const teacherShiftFormSchema: ObjectSchema<any> = object({
  id: number().optional(),
  shift: stringField(validationMessages.required),
  // aceptar string (no vacío) o array de strings (al menos 1 elemento no vacío)
  section: mixed()
    .test("section-type", validationMessages.required, (value) => {
      if (typeof value === "string") return value.trim() !== "";
      if (Array.isArray(value))
        return value.length > 0 && value.every((v) => typeof v === "string" && v.trim() !== "");
      return false;
    }),
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
  experienceYear: stringOptionalField()
});
