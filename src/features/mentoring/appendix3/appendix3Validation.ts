import { object, ObjectSchema } from "yup";
import { Appendix3Input } from "./appendix3Type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/functions";

export const appendix3Schema: ObjectSchema<Appendix3Input> = object({
  dimension: stringField(validationMessages.required),
  subDimension: stringField(validationMessages.required),
  goal: stringField(validationMessages.required),
  activities: stringField(validationMessages.required),
  resources: stringField(validationMessages.required),
  timing: stringField(validationMessages.required),
  classroomObservation: stringField(validationMessages.required),
  dialoguedFeedback: stringField(validationMessages.required),
  coPlanning: stringField(validationMessages.required),
  portfolioReview: stringField(validationMessages.required),
  teachingMaterial: stringField(validationMessages.required),
  others: stringField(validationMessages.required),
  nextVisit: stringField(validationMessages.required),
  estimatedFrequencyMeetings: stringField(validationMessages.required)
});
