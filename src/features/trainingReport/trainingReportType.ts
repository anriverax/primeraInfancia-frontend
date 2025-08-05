import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface TrainingReportInput {
  id?: | null;
  finalScore: number;
  status: string;
  remark: string;
}

export interface ITrainingReportTable extends TrainingReportInput {
}
export type ITrainingReport = TrainingReportInput & AxiosMessage;

export type ITrainingReportColumnKey = "finalScore" | "status" | "remark" | "createdBy";
export interface TrainingReportListResult {
  trainingReportsList: ITrainingReportTable[];
  setTrainingReportsList: (_trainingReports: ITrainingReportTable[]) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TrainingReportTableProps extends Pick<TrainingReportListResult, "trainingReportsList"> {
}

export interface TrainingReportModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}

export interface TrainingReportFormResult {
  trainingReportFormik: FormikProps<ITrainingReport>;
  reset: () => void;
  data: TrainingReportInput | null;
}

export interface TrainingReportModalAction extends TrainingReportModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
