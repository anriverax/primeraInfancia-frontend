export interface ZoneInput {
  id?: number;
  name: string;
}

export type DepartmentInput = ZoneInput;

export interface IZoneTable extends ZoneInput {
  _count?: {
    Group: number;
  };
}

export type IZoneColumnKey = "name" | "count" | "actions";
