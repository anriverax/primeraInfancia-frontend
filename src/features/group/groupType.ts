import { IColumns, IPagination, IPerson } from "@/shared/types/globals";
import { Dispatch, SetStateAction } from "react";
import { ZoneInput } from "../catalogue/zone/zoneType";

export type IGroupColumnKey = "name" | "count" | "department" | "actions";

export type IMentor = IPerson & { assignedMunicipality: string };
export interface Inscription {
  id: number;
  status: "Activo" | "Inactivo";
  teacher: IPerson & {
    User: {
      email: string;
      avatar: string | null;
    };
    school: string;
  };
}
export interface GroupList extends ZoneInput {
  memberCount: number;
  department: string;
  _count?: {
    Inscription: number;
  };
}
export interface IGroupTable extends ZoneInput {
  memberCount: number;
  department: string;
  _count?: {
    Inscription: number;
  };
}

export interface IGroupDetail extends IGroupTable {
  techSupport: IPerson;
  trainer: IPerson;
  teachers: Inscription[];
  mentors: IPerson[];
}
export interface GroupListResult {
  handleChangePage: Dispatch<SetStateAction<number>>;
  groupList: IGroupTable[];
  meta: IPagination | undefined;
  handleConfirmDeleteGroup: (_groupId: number, _groupName: string) => Promise<void>;
}

export interface GroupTableResult {
  bottomContent: React.JSX.Element | null;

  headerColumns: IColumns<IGroupColumnKey>[];
}

export interface IGroupByUser {
  id: number;
  Person: IPerson & {
    school: string;
    district: string;
    municipality: string;
  };
}

export type IGroupByUserColumnKey = "Person.fullName" | "Person.school" | "Person.district" | "actions";

export interface IDetailAppendixTable {
  title: string;
  answer_count: number;
}

export type IDetailAppendixColumnKey = "title" | "answer_count";

export interface DepartmentList {
  id: number;
  name: string;
}

export interface DepartmentGroupCount extends DepartmentList {
  _count: {
    Group: number;
  };
}

export interface DepartmentGroupCountResponse {
  departments: DepartmentGroupCount[];
  totalGroups: number;
  totalInscriptions: number;
}
