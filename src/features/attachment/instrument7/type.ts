import { AxiosMessage } from "@/shared/types/globals";

export interface Attachment7Input {
  startDate: string;
  finishDate: string;
  descriptionMentoringProcess: string;
  achievements: string;
  areaImprovement: string;
  suggestionTeacher: string;
  improvedNextCohort: string;
}

export type IAttachment7Input = Attachment7Input & AxiosMessage;
