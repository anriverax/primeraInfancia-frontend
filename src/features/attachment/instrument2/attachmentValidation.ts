import { object, ObjectSchema } from "yup";
import { Attachment2Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/funtions";

export const attachment2Schema: ObjectSchema<Attachment2Input> = object({
  educationalLevelServed: stringField(validationMessages.required),
  //childrenAge: stringField(validationMessages.required),
  yearsExperiencie: stringField(validationMessages.required),
  initialTraining: stringField(validationMessages.required),
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
