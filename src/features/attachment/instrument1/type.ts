import { AxiosMessage } from "@/shared/types/globals";

export interface Attachment1Input {
  startDate: Date;
  finishDate: Date;
  frequencyOfEncounters: string;
  teacherSignature: string;
  mentorSignature: string;
}

export type IAttachment1Input = Attachment1Input & AxiosMessage;
