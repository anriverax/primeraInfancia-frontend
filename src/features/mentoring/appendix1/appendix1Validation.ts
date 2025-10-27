import { date, object, ObjectSchema } from "yup";
import { Appendix1Input } from "./appendix1Type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/functions";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const appendix1Schema: ObjectSchema<Appendix1Input> = object({
  estimatedClosingDate: date()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .required("La fecha de cierre estimada es obligatoria")
    .min(today, "La fecha debe ser hoy o una fecha futura"),
  estimatedFrequencyMeetings: stringField(validationMessages.required)
});
