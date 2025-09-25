import { object, ObjectSchema } from "yup";
import { Attachment7Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/funtions";

export const attachment7Schema: ObjectSchema<Attachment7Input> = object({
  startDate: stringField(validationMessages.required),
  finishDate: stringField(validationMessages.required),
  descriptionMentoringProcess: stringField(validationMessages.required),
  achievements: stringField(validationMessages.required),
  areaImprovement: stringField(validationMessages.required),
  suggestionTeacher: stringField(validationMessages.required),
  improvedNextCohort: stringField(validationMessages.required)
});
