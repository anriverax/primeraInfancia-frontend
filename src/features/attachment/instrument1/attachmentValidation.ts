import { object, ObjectSchema } from "yup";
import { Attachment1Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/funtions";

export const attachment1Schema: ObjectSchema<Attachment1Input> = object({
  applicationDate: stringField(validationMessages.required),
  schoolName: stringField(validationMessages.required),
  departmentMunicipality: stringField(validationMessages.required),
  teacherName: stringField(validationMessages.required),
  mentorName: stringField(validationMessages.required),
  startDate: stringField(validationMessages.required),
  finishDate: stringField(validationMessages.required),
  frequencyOfEncounters: stringField(validationMessages.required),
  teacherSignature: stringField(validationMessages.required),
  mentorSignature: stringField(validationMessages.required)
});
