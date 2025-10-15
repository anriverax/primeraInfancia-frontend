import { AxiosMessage } from "@/shared/types/globals";

export interface Appendix1Input {
  ask1: Date;
  ask2: string;
  questionMap?: any;
}

export type IAppendix1Input = Appendix1Input & AxiosMessage;
