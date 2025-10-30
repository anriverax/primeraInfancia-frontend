import { object, ObjectSchema, string } from "yup";
import { Appendix3Input } from "./appendix3Type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/functions";

export const appendix3Schema = object({
  dimension: stringField(validationMessages.required),
  subDimension: stringField(validationMessages.required),
  goal: stringField(validationMessages.required),
  activities: stringField(validationMessages.required),
  resources: stringField(validationMessages.required),
  timing: stringField(validationMessages.required),
  successIndicator: stringField(validationMessages.required),
  levelOfAchievement: stringField(validationMessages.required),
  // classroomObservation: stringField(validationMessages.required),
  // dialoguedFeedback: stringField(validationMessages.required),
  // pedagogicalModeling: stringField(validationMessages.required),
  // coPlanning: stringField(validationMessages.required),
  // portfolioReview: stringField(validationMessages.required),
  // teachingMaterial: stringField(validationMessages.required),
  // others: stringField(validationMessages.required),
  // make otherStrategys optional
  otherStrategys: string().notRequired(),
  // nextVisit: stringField(validationMessages.required)
}) as ObjectSchema<Appendix3Input>;
