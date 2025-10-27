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
  experienceYear: string;
  initialTraining: string;
  initialTrainingOther?: string;
  complementaryStudies: string;

  complementaryStudiesOther?: string;

  participationContinuingEducation: string;
  participationContinuingEducationOther?: string;

  knowledgeOfChildDevelopmentInEarlyChildhood: string;
  planningLearningExperiences: string;
  levelPracticeInclusion: string;
  gameAndExplorationStrategies: string;
  assessmentOfLearning: string;
  relationshipWithFamilies: string;
  managementOfTheEducationalEnvironment: string;
  aspectsWouldYouLikeToImprove: string;
  challengesInYourClassroom: string;
  expectFromTheMentoring: string;
  anythingYouThinkIsImportant: string;
  mentorStaffObservations: string;
}

export type IAppendix2Input = Appendix2Input & AxiosMessage;
