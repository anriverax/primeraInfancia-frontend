import { object, ObjectSchema } from "yup";
import { Appendix2Input } from "./appendix2Type";
import { validationMessages } from "@/shared/constants";
import { stringField, numberField } from "@/shared/utils/functions";

export const appendix2Schema: ObjectSchema<Appendix2Input> = object({
  shift: stringField(validationMessages.required),
  section: stringField(validationMessages.required),
  girlNumber: numberField(validationMessages.required),
  boyNumber: numberField(validationMessages.required),
  girlDisabilityNumber: numberField(validationMessages.required),
  boyDisabilityNumber: numberField(validationMessages.required),
  experienceYear: stringField(validationMessages.required),
  initialTraining: stringField(validationMessages.required),
  initialTrainingOther: stringField(validationMessages.required),
  complementaryStudies: stringField(validationMessages.required),

  complementaryStudiesOther: stringField(validationMessages.required),

  participationContinuingEducation: stringField(validationMessages.required),
  participationContinuingEducationOther: stringField(validationMessages.required),

  knowledgeOfChildDevelopmentInEarlyChildhood: stringField(validationMessages.required),
  planningLearningExperiences: stringField(validationMessages.required),
  levelPracticeInclusion: stringField(validationMessages.required),
  gameAndExplorationStrategies: stringField(validationMessages.required),
  AssessmentOfLearning: stringField(validationMessages.required),
  RelationshipWithFamilies: stringField(validationMessages.required),
  ManagementOfTheEducationalEnvironment: stringField(validationMessages.required),

  Others: stringField(validationMessages.required),
  AspectsWouldYouLikeToImprove: stringField(validationMessages.required),
  challengesInYourClassroom: stringField(validationMessages.required),
  expectFromTheMentoring: stringField(validationMessages.required),
  anythingYouThinkIsImportant: stringField(validationMessages.required),
  mentorStaffObservations: stringField(validationMessages.required)
});
