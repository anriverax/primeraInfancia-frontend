import { AxiosMessage, IDistrictWithZone, IPagination, IPerson } from "@/shared/types/globals";
import { DepartmentInput, ZoneInput } from "../zone/zoneType";
import { Dispatch, SetStateAction } from "react";

export interface GroupInput extends ZoneInput {
  memberCount: number;
  departmentId: number;
}

export type IGroup = GroupInput & AxiosMessage;

export interface GroupSelectBoxResult {
  zonesList: ZoneInput[] | [];
}

export type IGroupColumnKey = "name" | "count" | "department" | "actions";

export interface IGroupPerson extends IPerson {
  User: {
    email: string;
    avatar: string;
  };
  WorkAssignment?: IDistrictWithZone;
}
export interface Inscription {
  id: number;
  status: "Activo" | "Inactivo";
  PersonRole: { Person: IGroupPerson };
}
export interface IGroupTable extends Omit<GroupInput, "zoneId"> {
  Department: DepartmentInput;
  GroupLeader?: [
    {
      id: number;
      PersonRole: {
        Person: IPerson;
      };
    }
  ];
  Inscription?: Inscription[];
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

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface GroupFormModalInput {
  isOpen: boolean;
  data?: any | null;
}

export interface GroupFormModalAction extends GroupFormModalInput {
  isOpenGroupFormModal: (_data?: any | null) => void;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
