import { AxiosMessage } from "@/shared/types/globals";

export interface DetailChildren {
  shift: string;
  section: string;
  girlNumber: number;
  boyNumber: number;
  girlDisabilityNumber: number;
  boyDisabilityNumber: number;
}

export interface Appendix2Input {
  ask1: DetailChildren[];
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
  ask15: string;
  ask16: string;
  ask17: string;
  ask18: string;
  ask19: string;
  ask20: string;
  questionMap?: any;
}

export type IAppendix2Input = Appendix2Input & AxiosMessage;
