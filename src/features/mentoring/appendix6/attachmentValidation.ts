import { object, ObjectSchema } from "yup";
import { Appendix6Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField, mixedField } from "@/shared/utils/funtions";

export const attachment6Schema: ObjectSchema<Appendix6Input> = object({
  ask1: stringField(validationMessages.required),
  ask2: stringField(validationMessages.required),
  ask3: stringField(validationMessages.required),
  ask4: stringField(validationMessages.required),
  ask5: stringField(validationMessages.required),
  ask6: stringField(validationMessages.required),
  ask7: stringField(validationMessages.required),
  ask8: stringField(validationMessages.required),
  ask9: stringField(validationMessages.required),
  questionMap: mixedField()
});
