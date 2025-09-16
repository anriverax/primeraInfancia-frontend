import { IColumns, IPagination } from "@/shared/types/globals";
import { Dispatch, SetStateAction } from "react";

export type ISchoolColumnKey =
  | "code"
  | "name"
  | "zone"
  | "coordenates"
  | "_count"
  | "ubication"
  | "actions";

export interface ISchoolTable {
  id: number;
  code: string;
  name: string;
  coordenates: string;
  ubication: string;
  _count: {
    PrincipalSchool: number;
  };
}

export interface SchoolTableResult {
  bottomContent: React.JSX.Element | null;

  headerColumns: IColumns<ISchoolColumnKey>[];
}

export interface SchoolListResult {
  handleChangePage: Dispatch<SetStateAction<number>>;
  schoolList: ISchoolTable[];
  meta: IPagination | undefined;
}
