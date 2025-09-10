import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface ModuleReportInput {
  id?: null;
  moduleScore: number;
  status: string;
  trainingModuleId: number;
  inscriptionId: number;
}

export interface IModuleReportTable extends ModuleReportInput {
  _count?: {
    Group: number;
  };
}
export type IModuleReport = ModuleReportInput & AxiosMessage;

export type IModuleReportColumnKey =
  | "moduleScore"
  | "status"
  | "trainingModuleId"
  | "inscriptionId"
  | "createdBy"
  | "trainingModule"
  | "Inscription";
export interface ModuleReportListResult {
  moduleReportsList: IModuleReportTable[];
  setModuleReportsList: (_modulReports: IModuleReportTable[]) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ModuleReportTableProps extends Pick<ModuleReportListResult, "moduleReportsList"> {}

export interface ModuleReportModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}

export interface ModuleReportFormResult {
  moduleReportFormik: FormikProps<IModuleReport>;
  reset: () => void;
  data: ModuleReportInput | null;
}

export interface ModuleReportModalAction extends ModuleReportModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
