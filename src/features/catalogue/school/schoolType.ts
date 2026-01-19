import { IColumns, IPagination } from "@/shared/types/globals";
import { Dispatch, SetStateAction } from "react";

export type ISchoolColumnKey = "code" | "name" | "zone" | "_count" | "ubication" | "actions";

export type ITeacherColumnKey = "fullName" | "email" | "phoneNumber";

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

export interface ISchoolDetail extends Omit<ISchoolTable, "_count" | "ubication"> {
  zone: string;
  sector: string;
  District: {
    id: number;
    name: string;
    Municipality: {
      id: number;
      name: string;
      Department: {
        id: number;
        name: string;
      };
    };
  };
  teachers: { id: number; phoneNumber: string; fullName: string }[];
}
