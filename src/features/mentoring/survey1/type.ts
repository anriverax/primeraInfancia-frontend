import { AxiosMessage } from "@/shared/types/globals";

export interface Appendix1Input {
  ask1: Date;
  ask2: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  questionMap?: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export type IAppendix1Input = Appendix1Input & AxiosMessage;
