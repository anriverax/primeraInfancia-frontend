import { AxiosMessage } from "@/shared/types/globals";

export interface TeacherShift {
  id?: number;
  shift: string;
  section: string;
  girlNumber: number;
  boyNumber: number;
  girlDisabilityNumber: number;
  boyDisabilityNumber: number;
  experienceYear: string;
}

export interface Appendix2Input {
  teacherShiftTable: TeacherShift[];
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

export type ITeacherShiftColumnKey =
  | "turn"
  | "section"
  | "boyNumber"
  | "girlNumber"
  | "boyDisabilityNumber"
  | "girlDisabilityNumber"
  | "total"
  | "action";

export interface IAnswerTeacherShift {
  index: number;
  question: string;
  answer: string | number;
}
