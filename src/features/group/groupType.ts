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
export interface IGroupTable extends ZoneInput {
  memberCount: number;
  department: string;
}

export interface IGroupDetail extends IGroupTable {
  leaders: IPerson & { assignedMunicipality: string };
  inscriptionPerson: Inscription[];
  mentors: IMentor[];
  _count?: {
    Inscription: number;
  };
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
