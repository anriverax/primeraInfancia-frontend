import { AxiosMessage } from "@/shared/types/globals";

export interface Attachment2Input {
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
