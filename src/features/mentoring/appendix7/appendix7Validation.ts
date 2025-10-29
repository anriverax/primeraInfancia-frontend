import { object, ObjectSchema } from "yup";
import { Appendix7Input } from "./appendix7Type";
import { validationMessages } from "@/shared/constants";
import { stringField } from "@/shared/utils/functions";

export const appendix7Schema: ObjectSchema<Appendix7Input> = object({
  mentoringProcessDescription: stringField(validationMessages.required),
  achieveOutcomes: stringField(validationMessages.required),
  improvementAreas: stringField(validationMessages.required),
  classroomObservation: stringField(validationMessages.required),
  pedagogicalModel: stringField(validationMessages.required),
  coPlanning: stringField(validationMessages.required),
  reflectiveDialogue: stringField(validationMessages.required),
  individualCoaching: stringField(validationMessages.required),
  other: stringField(validationMessages.required),
  deliveryInPerson: stringField(validationMessages.required),
  deliveryInPairs: stringField(validationMessages.required),
  deliverySituational: stringField(validationMessages.required),
  virtualIndividual: stringField(validationMessages.required),
  virtualInPairs: stringField(validationMessages.required),
  virtualSituational: stringField(validationMessages.required),
  followUpRecommendations: stringField(validationMessages.required),
  nextCohortImprovements: stringField(validationMessages.required)
});
