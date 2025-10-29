import { AxiosMessage } from "@/shared/types/globals";

export interface Appendix7Input {
  mentoringProcessDescription: string;
  achieveOutcomes: string;
  improvementAreas: string;
  classroomObservation: string;
  pedagogicalModel: string;
  coPlanning: string;
  reflectiveDialogue: string;
  individualCoaching: string;
  other: string;
  deliveryInPerson: string;
  deliveryInPairs: string;
  deliverySituational: string;
  virtualIndividual: string;
  virtualInPairs: string;
  virtualSituational: string;
  followUpRecommendations: string;
  nextCohortImprovements: string;
}

export type IAppendix7Input = Appendix7Input & AxiosMessage;
