import { object, ObjectSchema } from "yup";
import { Appendix1Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField, dateField, mixedField } from "@/shared/utils/functions";

export const appendix1Schema: ObjectSchema<Appendix1Input> = object({
  ask1: dateField(validationMessages.required),
  ask2: stringField(validationMessages.required),
  questionMap: mixedField()
});
