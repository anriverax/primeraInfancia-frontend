import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface EvaluationInstrumentInput {
  id?:  | null;
  instrumentName: string;
  periodicity: string;
  percentage: number;
}

export interface IEvaluationInstrumentTable extends EvaluationInstrumentInput {
  _count?: {
    Group: number;
  };
}
export type IEvaluationInstrument = EvaluationInstrumentInput & AxiosMessage;

export type IEvaluationInstrumentColumnKey = "instrumentName" | "periodicity" | "percentage" | "createdBy" ;
export interface EvaluationInstrumentListResult {
  evaluationInstrumentsList: IEvaluationInstrumentTable[];
  setEvaluationInstrumentsList: (_evaluationInstruments: IEvaluationInstrumentTable[]) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EvaluationInstrumentTableProps extends Pick<EvaluationInstrumentListResult, "evaluationInstrumentsList"> {
}

export interface EvaluationInstrumentModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}

export interface EvaluationInstrumentFormResult {
  evaluationInstrumentFormik: FormikProps<IEvaluationInstrument>;
  reset: () => void;
  data: EvaluationInstrumentInput | null;
}

export interface EvaluationInstrumentModalAction extends EvaluationInstrumentModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
