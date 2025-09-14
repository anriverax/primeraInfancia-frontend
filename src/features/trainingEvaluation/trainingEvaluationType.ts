import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface TrainingEvaluationInput {
  id?: null;
  grade: number;
  comment: string;
  evaluationInstrumentId: number;
  inscriptionId: number;
}

export interface ITrainingEvaluationTable extends TrainingEvaluationInput {
  _count?: {
    Group: number;
  };
}
export type ITrainingEvaluation = TrainingEvaluationInput & AxiosMessage;

export type ITrainingEvaluationColumnKey =
  | "grade"
  | "comment"
  | "evaluationInstrumentId"
  | "inscriptionId"
  | "createdBy"
  | "trainingModule"
  | "Inscription";
export interface TrainingEvaluationListResult {
  trainingEvaluationsList: ITrainingEvaluationTable[];
  setTrainingEvaluationsList: (_trainingevaluations: ITrainingEvaluationTable[]) => void;
}

/* eslint-disable  @typescript-eslint/no-empty-object-type */
export interface TrainingEvaluationTableProps
  extends Pick<TrainingEvaluationListResult, "trainingEvaluationsList"> {}
/* eslint-enable  @typescript-eslint/no-empty-object-type */

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TrainingEvaluationModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface TrainingEvaluationFormResult {
  trainingEvaluationFormik: FormikProps<ITrainingEvaluation>;
  reset: () => void;
  data: TrainingEvaluationInput | null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TrainingEvaluationModalAction extends TrainingEvaluationModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
