import { AxiosMessage } from "@/shared/types/globals";

export interface Appendix1Input {
  startDate: Date;
  finishDate: Date;
  frequencyOfEncounters: string;
  teacherSignature: string;
  mentorSignature: string;
}

export type IAppendix1Input = Appendix1Input & AxiosMessage;
