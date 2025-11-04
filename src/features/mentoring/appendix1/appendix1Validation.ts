/**
 * Appendix 1 validation schema using Yup.
 * - The closing date may come as an empty string and is transformed to null.
 * - The date must be today or in the future.
 * - The meeting frequency is required (uses stringField helper).
 */
import { date, object, ObjectSchema } from "yup";
import { Appendix1Input } from "./appendix1Type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/functions";

/** Reference date (00:00:00) to validate it is not earlier than today. */
const today = new Date();
today.setHours(0, 0, 0, 0);

/**
 * Yup validation schema for Appendix 1 fields.
 */
export const appendix1Schema: ObjectSchema<Appendix1Input> = object({
  estimatedClosingDate: date()
    .nullable()
    .transform((value, originalValue) => {
      // Treat an empty string from the input as null
      return originalValue === "" ? null : value;
    })
    .required("La fecha de cierre estimada es obligatoria")
    .min(today, "La fecha debe ser hoy o una fecha futura"),
  estimatedFrequencyMeetings: stringField(validationMessages.required)
});
