import { AxiosMessage } from "@/shared/types/globals";

export interface Appendix1Input {
  estimatedClosingDate: Date;
  estimatedFrequencyMeetings: string;
}

export type IAppendix1Input = Appendix1Input & AxiosMessage;
