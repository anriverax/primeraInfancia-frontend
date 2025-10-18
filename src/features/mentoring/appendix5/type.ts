import { AxiosMessage } from "@/shared/types/globals";

export interface Appendix5Input {
  ask1: string;
  ask2: string;
  ask3: string;
  ask4: string;
  ask5: string;
  ask6: string;
  ask7: string;
  ask8: string;
  ask9: string;
  ask10: string;
  ask11: string;
  ask12: string;
  ask13: string;
  ask14: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  questionMap?: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export type IAppendix5Input = Appendix5Input & AxiosMessage;
