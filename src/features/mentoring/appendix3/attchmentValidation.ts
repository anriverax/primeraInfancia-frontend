import { object, ObjectSchema } from "yup";
import { Appendix3Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField, arrayField, mixedField } from "@/shared/utils/funtions";

export const appendix3Schema: ObjectSchema<Appendix3Input> = object({
  ask1: arrayField(validationMessages.required),
  ask2: arrayField(validationMessages.required),
  ask3: stringField(validationMessages.required)
});
