import { AxiosMessage } from "@/shared/types/globals";

export interface IZone {
  id?: number | null;
  name: string;
}

export type ZoneInput = IZone & AxiosMessage;

export interface GroupData {}

export type IZoneColumnKey = "name" | "actions";

export interface ZoneModelState {
  visible: boolean;
  data?: ZoneListData | null;
  state: "Z" | "G";
}
