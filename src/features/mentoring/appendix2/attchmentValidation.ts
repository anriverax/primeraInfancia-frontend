import { object, ObjectSchema } from "yup";
import { Appendix2Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField, mixedField } from "@/shared/utils/funtions";

export const appendix2Schema: ObjectSchema<Appendix2Input> = object({
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
