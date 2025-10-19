import { object, ObjectSchema } from "yup";
import { Attachment6Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/functions";

export const attachment6Schema: ObjectSchema<Attachment6Input> = object({
  objectiveSessionMet: stringField(validationMessages.required),
  themesPractice: stringField(validationMessages.required),
  feedbackBeenGiven: stringField(validationMessages.required),
  progressImplementingStrategies: stringField(validationMessages.required),
  difficultiesObserverd: stringField(validationMessages.required),
  teacherStrengths: stringField(validationMessages.required),
  mentorsReflections: stringField(validationMessages.required),
  supportNeeds: stringField(validationMessages.required),
  accompanimentBeenRecorded: stringField(validationMessages.required)
});
