import { AxiosMessage } from "@/shared/types/globals";

export interface Appendix2Input {
  anx2Ask1: string;
  anx2Ask2: string;
  anx2Ask3: number;
  anx2Ask4: number;
  anx2Ask5: number;
  anx2Ask6: number;
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
}

export interface DataAppendix2 {
  questionId: number;
  valueText: string;
  inscriptionId: number;
}

export type IAppendix2Input = Appendix2Input & AxiosMessage;
