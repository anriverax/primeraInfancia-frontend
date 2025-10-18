import { object, ObjectSchema } from "yup";
import { Appendix2Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField, arrayField, mixedField } from "@/shared/utils/funtions";

export const appendix2Schema: ObjectSchema<Appendix2Input> = object({
  anx2Ask1: arrayField(validationMessages.required),
  // ask2: stringField(validationMessages.required),
  // ask3: stringField(validationMessages.required),
  // ask4: stringField(validationMessages.required),
  // ask5: stringField(validationMessages.required),
  // ask6: stringField(validationMessages.required),
  anx2Ask7: stringField(validationMessages.required),
  anx2Ask8: stringField(validationMessages.required),
  anx2Ask9: stringField(validationMessages.required),
  anx2Ask10: stringField(validationMessages.required),
  anx2Ask11: stringField(validationMessages.required),
  anx2Ask12: stringField(validationMessages.required),
  anx2Ask13: stringField(validationMessages.required),
  anx2Ask14: stringField(validationMessages.required),
  anx2Ask15: stringField(validationMessages.required),
  anx2Ask16: stringField(validationMessages.required),
  anx2Ask17: stringField(validationMessages.required),
  anx2Ask18: stringField(validationMessages.required),
  anx2Ask19: stringField(validationMessages.required),
  anx2Ask20: stringField(validationMessages.required),
  anx2Ask21: stringField(validationMessages.required),
  anx2Ask22: stringField(validationMessages.required),
  anx2Ask23: stringField(validationMessages.required),
  anx2Ask24: stringField(validationMessages.required),
  questionMap: mixedField()
});
