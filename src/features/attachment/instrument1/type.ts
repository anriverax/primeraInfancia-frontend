import { AxiosMessage } from "@/shared/types/globals";

export interface Attachment1Input {
  startDate: string;
  finishDate: string;
  frequencyOfEncounters: string;
  teacherSignature: string;
  mentorSignature: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  questionMap?: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export type IAttachment1Input = Attachment1Input & AxiosMessage;
