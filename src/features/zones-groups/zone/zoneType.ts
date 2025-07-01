import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface ZoneInput {
  id?: number | null;
  name: string;
}

export interface IZoneTable extends ZoneInput {
  _count?: {
    Group: number;
  };
}
export type IZone = ZoneInput & AxiosMessage;

export type IZoneColumnKey = "name" | "count" | "actions";
export interface ZoneListResult {
  zonesList: IZoneTable[];
  onDeleteZone: (_zoneId: number) => Promise<void>;
  setZonesList: (_zones: IZoneTable[]) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ZoneTableProps extends Pick<ZoneListResult, "zonesList" | "onDeleteZone"> {
  onEditZone: (_form: "Z" | "G", _data?: any | null) => void;
}

export interface ZoneModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}

export interface ZoneFormResult {
  zoneFormik: FormikProps<IZone>;
  reset: () => void;
  data: ZoneInput | null;
}

export interface ZoneModalAction extends ZoneModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
