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
  anx2Ask1: DetailChildren[];
  // ask2: string;
  // ask3: string;
  // ask4: string;
  // ask5: string;
  // ask6: string;
  anx2Ask7: string;
  anx2Ask8: string;
  anx2Ask9: string;
  anx2Ask10: string;
  anx2Ask11: string;
  anx2Ask12: string;
  anx2Ask13: string;
  anx2Ask14: string;
  anx2Ask15: string;
  anx2Ask16: string;
  anx2Ask17: string;
  anx2Ask18: string;
  anx2Ask19: string;
  anx2Ask20: string;
  anx2Ask21: string;
  anx2Ask22: string;
  anx2Ask23: string;
  anx2Ask24: string;
  questionMap?: any;
}

export type IAppendix2Input = Appendix2Input & AxiosMessage;
