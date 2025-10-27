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

  initialTrainingOther?: string;
  additionalEducation?: string;
  additionalEducationDetail1?: string;
  additionalEducationDetail2?: string;
  additionalEducationDetail3?: string;
  additionalEducationDetail4?: string;
  participatedTraining?: string;
  participationDetail?: string;
  level_practice_knowledge?: string;
  level_practice_planning?: string;
  level_practice_inclusion?: string;
  level_practice_strategies?: string;
  level_practice_evaluation?: string;
  level_practice_family?: string;
  level_practice_environment?: string;

  // ahora opcionales porque no se usan en el formulario actual
  complementaryStudies?: string;
  participationContinuingEducation?: string;
  knowledgeOfChildDevelopmentInEarlyChildhood?: string;
  planningLearningExperiences?: string;
  gameAndExplorationStrategies?: string;
  AssessmentOfLearning?: string;
  RelationshipWithFamilies?: string;
  ManagementOfTheEducationalEnvironment?: string;
  Others?: string;

  AspectsWouldYouLikeToImprove: string;
  challengesInYourClassroom: string;
  expectFromTheMentoring: string;
  anythingYouThinkIsImportant: string;
  mentorStaffObservations: string;
}

export type IAppendix2Input = Appendix2Input & AxiosMessage;
