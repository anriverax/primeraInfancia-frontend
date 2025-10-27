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
  shift: string;
  section: string;
  girlNumber: number;
  boyNumber: number;
  girlDisabilityNumber: number;
  boyDisabilityNumber: number;
  experienceYear: string;
  initialTraining: string;
  initialTrainingOther: string;
  complementaryStudies: string;

  complementaryStudiesOther?: string;

  participationContinuingEducation: string;
  participationContinuingEducationOther?: string;

  knowledgeOfChildDevelopmentInEarlyChildhood: string;
  planningLearningExperiences: string;
  levelPracticeInclusion: string;
  gameAndExplorationStrategies: string;
  AssessmentOfLearning: string;
  RelationshipWithFamilies: string;
  ManagementOfTheEducationalEnvironment: string;

  Others: string;
  AspectsWouldYouLikeToImprove: string;
  challengesInYourClassroom: string;
  expectFromTheMentoring: string;
  anythingYouThinkIsImportant: string;
  mentorStaffObservations: string;

}

export type IAppendix2Input = Appendix2Input & AxiosMessage;
