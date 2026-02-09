export type PersonTempColumnsKey = "fullName" | "excel" | "db" | "actions";

export interface DepartGroup {
  id: number;
  name: string;
  memberCount: number;
}

export interface DepartmentGroupList {
  id: number;
  name: string;
  Group: DepartGroup[];
}

export interface PersonNotFoundTableType {
  id: number | -1;
  fullName: string;
  excel: boolean;
  db: boolean;
}

export interface ExcelReadCompareResult {
  label: string;
  found: string;
  notFound: PersonNotFoundTableType[];
}
