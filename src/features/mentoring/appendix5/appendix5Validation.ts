import { object, ObjectSchema } from "yup";
import { Appendix5Input } from "./appendix5Type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/functions";

export const appendix5Schema: ObjectSchema<Appendix5Input> = object({
  teacherFocusArea: stringField(validationMessages.required),
  recentDifficulties: stringField(validationMessages.required),
  improvementGoals: stringField(validationMessages.required),
  practiceHighlights: stringField(validationMessages.required),
  emotionalConnection: stringField(validationMessages.required),
  emotionalAwareness: stringField(validationMessages.required),
  identifiedStrengths: stringField(validationMessages.required),
  dilemasTensions: stringField(validationMessages.required),
  keyLearning: stringField(validationMessages.required),
  commitmentNextSession: stringField(validationMessages.required),
  changesSinceLast: stringField(validationMessages.required),
  observedEvidence: stringField(validationMessages.required),
  recomendation: stringField(validationMessages.required),
  othersNotes: stringField(validationMessages.required)
});
