import { object, ObjectSchema } from "yup";
import { Appendix5Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField, mixedField } from "@/shared/utils/funtions";

export const appendix5Schema: ObjectSchema<Appendix5Input> = object({
  ask1: stringField(validationMessages.required),
  ask2: stringField(validationMessages.required),
  ask3: stringField(validationMessages.required),
  ask4: stringField(validationMessages.required),
  ask5: stringField(validationMessages.required),
  ask6: stringField(validationMessages.required),
  ask7: stringField(validationMessages.required),
  ask8: stringField(validationMessages.required),
  ask9: stringField(validationMessages.required),
  ask10: stringField(validationMessages.required),
  ask11: stringField(validationMessages.required),
  ask12: stringField(validationMessages.required),
  ask13: stringField(validationMessages.required),
  ask14: stringField(validationMessages.required)
});
