import { object, ObjectSchema } from "yup";
import { Attachment2Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField, numberField } from "@/shared/utils/funtions";

export const attachment2Schema: ObjectSchema<Attachment2Input> = object({
  shift: stringField(validationMessages.required),
  section: stringField(validationMessages.required),
  girlNumber: numberField(validationMessages.required),
  boyNumber: numberField(validationMessages.required),
  girlDisabilityNumber: numberField(validationMessages.required),
  boyDisabilityNumber: numberField(validationMessages.required),
  yearsExperiencie: stringField(validationMessages.required),
  initialTraining: stringField(validationMessages.required),
  hasPostgraduate: stringField(validationMessages.required),
  postgraduateDetail: stringField(validationMessages.required),
  hasRecentlyParticipated: stringField(validationMessages.required),
  hasRecentlyParticipatedDetail: stringField(validationMessages.required),
  knowledgeChildDevelopment: stringField(validationMessages.required),
  planningLearningExperiences: stringField(validationMessages.required),
  attentionEducationalInclusion: stringField(validationMessages.required),
  gameExplorationStrategies: stringField(validationMessages.required),
  assessmentLearning: stringField(validationMessages.required),
  relationshipFamilies: stringField(validationMessages.required),
  managementEducationalEnvironment: stringField(validationMessages.required),
  others: stringField(validationMessages.required),
  aspectsImprove: stringField(validationMessages.required),
  challengesAtClassroom: stringField(validationMessages.required),
  whatExpect: stringField(validationMessages.required),
  anythingElse: stringField(validationMessages.required),
  mentorObservations: stringField(validationMessages.required)
});
