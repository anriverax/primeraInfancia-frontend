import { array, object, ObjectSchema, string } from "yup";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/functions";
import { Activity, Appendix3Schema, DimensionPlanSchema } from "./appendix3Type";

const activitySchema: ObjectSchema<Activity> = object({
  activity: stringField(validationMessages.required),
  resource: stringField(validationMessages.required),
  timing: stringField(validationMessages.required),
  successIndicator: stringField(validationMessages.required)
});

const dimensionPlanSchema: ObjectSchema<DimensionPlanSchema> = object({
  dimension: stringField(validationMessages.required),
  subDimension: stringField(validationMessages.required),
  goal: stringField(validationMessages.required),
  levelOfAchievement: stringField(validationMessages.required),
  activities: array().of(activitySchema).min(1).required()
});

export const appendix3Schema: ObjectSchema<Appendix3Schema> = object({
  dimensions: array().of(dimensionPlanSchema).min(1).required(),
  otherStrategies: string().optional(),
  strategies: array().of(string().trim().min(1).required()).optional()
});
