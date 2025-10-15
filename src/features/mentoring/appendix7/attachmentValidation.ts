import { object, ObjectSchema } from "yup";
import { Attachment7Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField, mixedField } from "@/shared/utils/funtions";

export const attachment7Schema: ObjectSchema<Attachment7Input> = object({
  ask1: stringField(validationMessages.required),
  ask2: stringField(validationMessages.required),
  ask3: stringField(validationMessages.required),
  ask4: stringField(validationMessages.required),
  ask5: stringField(validationMessages.required),
  ask6: stringField(validationMessages.required)
});
