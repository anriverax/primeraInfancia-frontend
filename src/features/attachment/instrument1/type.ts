import { AxiosMessage } from "@/shared/types/globals";

export interface Attachment1Input {
  startDate: string;
  finishDate: string;
  frequencyOfEncounters: string;
  teacherSignature: string;
  mentorSignature: string;
  questionMap?: any;
}

export type IAttachment1Input = Attachment1Input & AxiosMessage;
