import { object, ObjectSchema } from "yup";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/functions";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const attachment1Schema: ObjectSchema<any> = object({
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
