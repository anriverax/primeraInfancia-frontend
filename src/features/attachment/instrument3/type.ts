import { AxiosMessage } from "@/shared/types/globals";

export interface Attachment3Input {
  dimension: string;
  subdimension: string;
  goal: string;
  activities: string;
  resources: string;
  tempo: string;
  successIndicators: string;
  levelAchievement: string;
  classrromObservations: string;
  observationRoutine: string;
  dialoguedFeedback: string;
  modelingPractices: string;
  coPlanningActivities: string;
  portfolioReview: string;
  analysisEvidence: string;
  other: string;
}

export type IAttachment3Input = Attachment3Input & AxiosMessage;
