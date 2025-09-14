import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface ModuleEvaluationInput {
  id?: null;
  grade: number;
  comment: string;
  moduleProgressStatus: string;
  evaluationInstrumentId: number;
  inscriptionId: number;
}

export interface IModuleEvaluationTable extends ModuleEvaluationInput {
  _count?: {
    Group: number;
  };
}
export type IModuleEvaluation = ModuleEvaluationInput & AxiosMessage;

export type IModuleEvaluationColumnKey =
  | "grade"
  | "comment"
  | "moduleProgressStatus"
  | "evaluationInstrumentId"
  | "inscriptionId"
  | "createdBy"
  | "trainingModuleId";
export interface ModuleEvaluationListResult {
  moduleEvaluationsList: IModuleEvaluationTable[];
  setModuleEvaluationsList: (_moduleEvaluations: IModuleEvaluationTable[]) => void;
}

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface ModuleEvaluationTableProps
  extends Pick<ModuleEvaluationListResult, "moduleEvaluationsList"> {}
/* eslint-enable @typescript-eslint/no-empty-object-type */

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ModuleEvaluationModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface ModuleEvaluationFormResult {
  moduleEvaluationFormik: FormikProps<IModuleEvaluation>;
  reset: () => void;
  data: ModuleEvaluationInput | null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ModuleEvaluationModalAction extends ModuleEvaluationModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
