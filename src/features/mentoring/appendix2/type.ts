import { AxiosMessage } from "@/shared/types/globals";

export interface DetailChildren {
  shift: string;
  section: string;
  girlNumber: number;
  boyNumber: number;
  girlDisabilityNumber: number;
  boyDisabilityNumber: number;
}

export interface Appendix2Input {
  detailChildren: DetailChildren[];
  yearsExperiencie: string;
  initialTraining: string;
  hasPostgraduate: string;
  postgraduateDetail: string;
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

export type IAppendix2Input = Appendix2Input & AxiosMessage;
