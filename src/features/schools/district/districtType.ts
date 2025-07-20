import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface DistrictInput {
  id?: number | null;
  name: string;
}

export interface IDistrictTable extends DistrictInput {
  _count?: {
    Group: number;
  };
}
export type IDistrict = DistrictInput & AxiosMessage;

export type IDistrictColumnKey = "name" | "count" | "actions";
export interface DistrictListResult {
  districtsList: IDistrictTable[];
  onDeleteDistrict: (_districtId: number) => Promise<void>;
  setDistrictsList: (_districts: IDistrictTable[]) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DistrictTableProps extends Pick<DistrictListResult, "districtsList" | "onDeleteDistrict"> {
  onEditDistrict: (_form: "Z" | "G", _data?: any | null) => void;
}

export interface DistrictModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}

export interface DistrictFormResult {
  districtFormik: FormikProps<IDistrict>;
  reset: () => void;
  data: DistrictInput | null;
}

export interface DistrictModalAction extends DistrictModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
