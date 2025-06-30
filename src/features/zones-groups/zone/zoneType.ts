import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface ZoneInput {
  id?: number | null;
  name: string;
}

export type IZone = ZoneInput & AxiosMessage;

export type IZoneColumnKey = "name" | "actions";
export interface ZoneListResponse {
  zonesList: IZone[];
  deleteZone: (_zoneId: number) => Promise<void>;
  setZonesList: (_zones: IZone[]) => void;
}

export type ZoneTableProps = Pick<ZoneListResponse, "zonesList" | "deleteZone">;

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ZoneModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}

export interface ZoneFormResponse {
  zoneFormik: FormikProps<IZone>;
  reset: () => void;
  data: ZoneInput | null;
}

export interface ZoneModalAction extends ZoneModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
