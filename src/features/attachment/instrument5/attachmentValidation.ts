import { object, ObjectSchema } from "yup";
import { Attachment5Input } from "./type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/funtions";

export const attachment5Schema: ObjectSchema<Attachment5Input> = object({
  mentorObserve: stringField(validationMessages.required),
  challengeClassroom: stringField(validationMessages.required),
  emotionalManagment: stringField(validationMessages.required),
  whatImprove: stringField(validationMessages.required),
  practiceHighlights: stringField(validationMessages.required),
  emotionalBond: stringField(validationMessages.required),
  identifiedPotentials: stringField(validationMessages.required),
  dilemmansObserved: stringField(validationMessages.required),
  questionsDidWeAsk: stringField(validationMessages.required),
  lessonsEmerged: stringField(validationMessages.required),
  improvementNextSession: stringField(validationMessages.required),
  changesTeachingStaff: stringField(validationMessages.required),
  evidenceObserved: stringField(validationMessages.required),
  mentorRecommendations: stringField(validationMessages.required)
});
