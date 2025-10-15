import { AxiosMessage } from "@/shared/types/globals";

export interface Appendix6Input {
  ask1: string;
  ask2: string;
  ask3: string;
  ask4: string;
  ask5: string;
  ask6: string;
  ask7: string;
  ask8: string;
  ask9: string;
  questionMap?: any;
}

export type IAppendix6Input = Appendix6Input & AxiosMessage;
