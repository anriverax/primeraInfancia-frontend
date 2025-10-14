import { AxiosMessage } from "@/shared/types/globals";

export interface Appendix1Input {
  ask1: Date;
  ask2: string;
  questionId1: number;
  questionId2: number;
}

export type IAppendix1Input = Appendix1Input & AxiosMessage;
