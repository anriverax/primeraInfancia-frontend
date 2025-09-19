import { AxiosMessage } from "@/shared/types/globals";

export interface Attachment3Input {
  startDate: string;
  goalList: string;
  workArea: string;
  justification: string;
  priorityLevel: string;
  plannedDate: string;
  activity: string;
  mode: string;
  responsible: string;
  observations: string;
  classrromObservations: string;
  dialoguedFeedback: string;
  modelingPractices: string;
  coPlanningActivities: string;
  portfolioReview: string;
  analysisEvidence: string;
  other: string;
  resourceList: string;
  expectedIndicators: string;
  reviewFrecuency: string;
  adjustedPlan: string;
  teachingPortfolio: string;
  observationRecords: string;
  otherEvidence: string;
  improveAspects: string;
  proposals: string;
}

export type IAttachment3Input = Attachment3Input & AxiosMessage;
