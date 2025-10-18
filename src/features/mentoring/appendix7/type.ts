import { AxiosMessage } from "@/shared/types/globals";

export interface Attachment7Input {
  ask1: string;
  ask2: string;
  ask3: string;
  ask4: string;
  ask5: string;
  ask6: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  questionMap?: any;
  /* eslint-enable @typescript-eslint/no-explicit-any */
}

export type IAttachment7Input = Attachment7Input & AxiosMessage;
