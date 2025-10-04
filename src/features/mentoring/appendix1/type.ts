import { AxiosMessage } from "@/shared/types/globals";

export interface Appendix1Input {
  finishDate: Date;
  frequencyOfEncounters: string;
}

export type IAppendix1Input = Appendix1Input & AxiosMessage;
