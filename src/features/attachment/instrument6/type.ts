import { AxiosMessage } from "@/shared/types/globals";

export interface Attachment6Input {
  objectiveSessionMet: string;
  themesPractice: string;
  feedbackBeenGiven: string;
  progressImplementingStrategies: string;
  difficultiesObserverd: string;
  teacherStrengths: string;
  mentorsReflections: string;
  supportNeeds: string;
  accompanimentBeenRecorded: string;
}

export type IAttachment6Input = Attachment6Input & AxiosMessage;
