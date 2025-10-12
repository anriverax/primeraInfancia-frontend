import { object, ObjectSchema } from "yup";
import { Appendix2Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField, arrayField } from "@/shared/utils/funtions";

export const appendix2Schema: ObjectSchema<Appendix2Input> = object({
  ask1: arrayField(validationMessages.required),
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
  ask14: stringField(validationMessages.required),
  ask15: stringField(validationMessages.required),
  ask16: stringField(validationMessages.required),
  ask17: stringField(validationMessages.required),
  ask18: stringField(validationMessages.required),
  ask19: stringField(validationMessages.required),
  ask20: stringField(validationMessages.required)
});
