import { AxiosMessage } from "@/shared/types/globals";

export interface Attachment1Input {
  applicationDate: string;
  schoolName: string;
  departmentMunicipality: string;
  teacherName: string;
  mentorName: string;
  startDate: string;
  finishDate: string;
  frequencyOfEncounters: string;
  teacherSignature: string;
  mentorSignature: string;
}

export type IAttachment1Input = Attachment1Input & AxiosMessage;

export interface Attachment2Input {
  fullName: string;
  schoolName: string;
  departmentMunicipality: string;
  educationalLevelServed: string;
  childrenAge: string;
  yearsExperiencie: string;
  initialTraining: string;
  hasRecentlyParticipated: string;
  hasRecentlyParticipatedDetail: string;
  knowledgeChildDevelopment: string;
  planningLearningExperiences: string;
  attentionEducationalInclusion: string;
  gameExplorationStrategies: string;
  assessmentLearning: string;
  relationshipFamilies: string;
  managementEducationalEnvironment: string;
  others: string;
  aspectsImprove: string;
  challengesAtClassroom: string;
  whatExpect: string;
  anythingElse: string;
  mentorObservations: string;
}

export type IAttachment2Input = Attachment2Input & AxiosMessage;

export interface Attachment3Input {
  teacherName: string;
  mentorName: string;
  schoolName: string;
  departmentMunicipality: string;
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
