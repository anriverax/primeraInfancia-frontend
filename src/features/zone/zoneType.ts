export interface ZoneInput {
  id?: number;
  name: string;
}

export type DepartmentInput = ZoneInput;

export interface IZoneTable extends ZoneInput {
  departmets: string;
  total: number;
}

export type IZoneColumnKey = "name" | "department" | "total";
