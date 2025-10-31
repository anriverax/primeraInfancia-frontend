import { array, object, ObjectSchema, string } from "yup";
import { Appendix2Input } from "./appendix2Type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/functions";
import { teacherShiftFormSchema } from "./teacherShiftValidation";
export const appendix2Schema: ObjectSchema<Appendix2Input> = object({
  teacherShiftTable: array().of(teacherShiftFormSchema).required(),
  initialTraining: stringField(validationMessages.required),
  initialTrainingOther: string().when("initialTraining", ([initialTraining]) => {
    return initialTraining === "Otros" ? stringField(validationMessages.required) : string().optional();
  }),

  complementaryStudies: stringField(validationMessages.required),
  complementaryStudiesOther: string().when("complementaryStudies", ([complementaryStudies]) => {
    return complementaryStudies !== "" ? stringField(validationMessages.required) : string().optional();
  }),

  participationContinuingEducation: stringField(validationMessages.required),
  participationContinuingEducationOther: string().when(
    "participationContinuingEducation",
    ([participationContinuingEducation]) => {
      return participationContinuingEducation === "Si"
        ? stringField(validationMessages.required)
        : string().optional();
    }
  ),

  knowledgeOfChildDevelopmentInEarlyChildhood: stringField(validationMessages.required),
  planningLearningExperiences: stringField(validationMessages.required),
  levelPracticeInclusion: stringField(validationMessages.required),
  gameAndExplorationStrategies: stringField(validationMessages.required),
  assessmentOfLearning: stringField(validationMessages.required),
  relationshipWithFamilies: stringField(validationMessages.required),
  managementOfTheEducationalEnvironment: stringField(validationMessages.required),
  aspectsWouldYouLikeToImprove: stringField(validationMessages.required),
  challengesInYourClassroom: stringField(validationMessages.required),
  expectFromTheMentoring: stringField(validationMessages.required),
  anythingYouThinkIsImportant: stringField(validationMessages.required),
  mentorStaffObservations: stringField(validationMessages.required)
});
