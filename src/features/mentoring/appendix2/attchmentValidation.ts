import { object, ObjectSchema } from "yup";
import { Appendix2Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField, arrayField } from "@/shared/utils/funtions";

export const appendix2Schema: ObjectSchema<Appendix2Input> = object({
  detailChildren: arrayField(validationMessages.required),
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
  mentorObservations: stringField(validationMessages.required),
});

