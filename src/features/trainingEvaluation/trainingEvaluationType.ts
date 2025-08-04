import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface TrainingEvaluationInput {
  id?:  | null;
  grade: number;
  comment: string;
  evaluationInstrumentId: number;
  enrollmentId: number;
}

export interface ITrainingEvaluationTable extends TrainingEvaluationInput {
  _count?: {
    Group: number;
  };
}
export type ITrainingEvaluation = TrainingEvaluationInput & AxiosMessage;

export type ITrainingEvaluationColumnKey = "grade" | "comment" | "evaluationInstrumentId" | "enrollmentId" | "createdBy" | "trainingModule" | "Enrollment";
export interface TrainingEvaluationListResult {
  trainingEvaluationsList: ITrainingEvaluationTable[];
  setTrainingEvaluationsList: (_trainingevaluations: ITrainingEvaluationTable[]) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TrainingEvaluationTableProps extends Pick<TrainingEvaluationListResult, "trainingEvaluationsList"> {
}

export interface TrainingEvaluationModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}

export interface TrainingEvaluationFormResult {
  trainingEvaluationFormik: FormikProps<ITrainingEvaluation>;
  reset: () => void;
  data: TrainingEvaluationInput | null;
}

export interface TrainingEvaluationModalAction extends TrainingEvaluationModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
