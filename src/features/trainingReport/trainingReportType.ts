import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface TrainingReportInput {
  id?: null;
  finalScore: number;
  status: string;
  remark: string;
}

/* eslint-disable  @typescript-eslint/no-empty-object-type */
export interface ITrainingReportTable extends TrainingReportInput {}
/* eslint-enable @typescript-eslint/no-empty-object-type */
export type ITrainingReport = TrainingReportInput & AxiosMessage;

export type ITrainingReportColumnKey = "finalScore" | "status" | "remark" | "createdBy";

export interface TrainingReportListResult {
  trainingReportsList: ITrainingReportTable[];
  setTrainingReportsList: (_trainingReports: ITrainingReportTable[]) => void;
}

/* eslint-disable  @typescript-eslint/no-empty-object-type */
export interface TrainingReportTableProps
  extends Pick<TrainingReportListResult, "trainingReportsList"> {}
/* eslint-enable @typescript-eslint/no-empty-object-type */

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TrainingReportModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface TrainingReportFormResult {
  trainingReportFormik: FormikProps<ITrainingReport>;
  reset: () => void;
  data: TrainingReportInput | null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TrainingReportModalAction extends TrainingReportModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
