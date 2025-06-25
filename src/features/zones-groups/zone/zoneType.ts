import { AxiosMessage } from "@/shared/types/globals";
import { Dispatch, SetStateAction } from "react";

export interface IZone {
  id?: number | null;
  name: string;
}

export type ZoneInput = IZone & AxiosMessage;

export type IZoneColumnKey = "name" | "actions";
export interface ZoneListResponse {
  zonesList: IZone[];
  deleteZone: (_zoneId: number) => Promise<void>;
  setZonesList: Dispatch<SetStateAction<IZone[]>>;
}

export type ZoneTableProps = Pick<ZoneListResponse, "zonesList" | "deleteZone">;

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ZoneModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}

export interface ZoneModalAction extends ZoneModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
export interface GroupSchema {
  description?: string;
  memberCount: number;
  zoneId: number;
}

export type GroupData = GroupSchema & AxiosMessage;
