import { array, object, ObjectSchema, string } from "yup";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/functions";
import { Appendix3Input } from "./appendix3Type";

export const appendix3Schema: ObjectSchema<Appendix3Input> = object({
  dimension: stringField(validationMessages.required),
  subDimension: stringField(validationMessages.required),
  goal: stringField(validationMessages.required),
  activities: stringField(validationMessages.required),
  resources: stringField(validationMessages.required),
  timing: stringField(validationMessages.required),
  successIndicator: stringField(validationMessages.required),
  levelOfAchievement: stringField(validationMessages.required),
  otherStrategys: string().optional(),
  strategies: array().of(string().required()).optional()
});
