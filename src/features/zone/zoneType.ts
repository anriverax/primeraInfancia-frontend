export interface ZoneInput {
  id?: number | null;
  name: string;
}

export interface IZoneTable extends ZoneInput {
  _count?: {
    Group: number;
  };
}

export type IZoneColumnKey = "name" | "count" | "actions";
