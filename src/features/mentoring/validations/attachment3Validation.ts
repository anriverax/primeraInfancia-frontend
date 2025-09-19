import { object, ObjectSchema } from "yup";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/funtions";
import { Attachment3Input } from "../mentoringType";

export const attachment3Schema: ObjectSchema<Attachment3Input> = object({
  teacherName: stringField(validationMessages.required),
  mentorName: stringField(validationMessages.required),
  schoolName: stringField(validationMessages.required),
  departmentMunicipality: stringField(validationMessages.required),
  startDate: stringField(validationMessages.required),
  goalList: stringField(validationMessages.required),
  workArea: stringField(validationMessages.required),
  justification: stringField(validationMessages.required),
  priorityLevel: stringField(validationMessages.required),
  plannedDate: stringField(validationMessages.required),
  activity: stringField(validationMessages.required),
  mode: stringField(validationMessages.required),
  responsible: stringField(validationMessages.required),
  observations: stringField(validationMessages.required),
  classrromObservations: stringField(validationMessages.required),
  dialoguedFeedback: stringField(validationMessages.required),
  modelingPractices: stringField(validationMessages.required),
  coPlanningActivities: stringField(validationMessages.required),
  portfolioReview: stringField(validationMessages.required),
  analysisEvidence: stringField(validationMessages.required),
  other: stringField(validationMessages.required),
  resourceList: stringField(validationMessages.required),
  expectedIndicators: stringField(validationMessages.required),
  reviewFrecuency: stringField(validationMessages.required),
  adjustedPlan: stringField(validationMessages.required),
  teachingPortfolio: stringField(validationMessages.required),
  observationRecords: stringField(validationMessages.required),
  otherEvidence: stringField(validationMessages.required),
  improveAspects: stringField(validationMessages.required),
  proposals: stringField(validationMessages.required)
});
