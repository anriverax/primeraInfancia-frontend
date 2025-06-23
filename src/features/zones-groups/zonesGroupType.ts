import { AxiosMessage } from "@/shared/types/globals";

export interface ZoneSchema {
  name: string;
}

export interface GroupSchema extends ZoneSchema {
  description?: string;
  memberCount: number;
  zoneId: number;
}

export type ZoneData = ZoneSchema & AxiosMessage;
export type GroupData = GroupSchema & AxiosMessage;
