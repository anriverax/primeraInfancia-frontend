import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface SchoolInput {
  id?: number | null;
  name: string;
  sector: string;
  districtId: number;
  address: string;
  email: string;
  coordenates: string;
  phoneNumber: string;
}

export interface ISchoolTable extends SchoolInput {
  _count?: {
    Group: number;
  };
}
export type ISchool = SchoolInput & AxiosMessage;

export type ISchoolColumnKey = "name" | "sector" | "district" | "address" | "email" | "coordenates" | "phoneNumber" | "createdBy" | "actions";
export interface SchoolListResult {
  schoolsList: ISchoolTable[];
  onDeleteSchool: (_schoolId: number) => Promise<void>;
  setSchoolsList: (_schools: ISchoolTable[]) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SchoolTableProps extends Pick<SchoolListResult, "schoolsList" | "onDeleteSchool"> {
  onEditSchool: (_form: "Z" | "G", _data?: any | null) => void;
}

export interface SchoolModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}

export interface SchoolFormResult {
  schoolFormik: FormikProps<ISchool>;
  reset: () => void;
  data: SchoolInput | null;
}

export interface SchoolModalAction extends SchoolModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
