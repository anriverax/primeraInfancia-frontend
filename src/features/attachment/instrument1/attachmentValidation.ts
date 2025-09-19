import { object, ObjectSchema } from "yup";
import { Attachment1Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/funtions";

export const attachment1Schema: ObjectSchema<Attachment1Input> = object({
  startDate: stringField(validationMessages.required),
  finishDate: stringField(validationMessages.required),
  frequencyOfEncounters: stringField(validationMessages.required),
  teacherSignature: stringField(validationMessages.required),
  mentorSignature: stringField(validationMessages.required)
});
