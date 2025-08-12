import { AxiosMessage, FormikProps, IPagination } from "@/shared/types/globals";
import { ZoneInput } from "../zone/zoneType";
import { Dispatch, SetStateAction } from "react";

export interface GroupInput extends ZoneInput {
  description?: string;
  memberCount: number;
  zoneId: number;
}

export type IGroup = GroupInput & AxiosMessage;

export interface GroupFormResult {
  groupFormik: FormikProps<IGroup>;
  reset: () => void;
  data: GroupInput | null;
}

export interface GroupSelectBoxResult {
  zonesList: ZoneInput[] | [];
}

export type IGroupColumnKey = "name" | "count" | "zone" | "actions";

export interface IPerson {
  id: true;
  fullName?: string;
  phoneNumber?: string;
}
export interface IGroupPerson extends IPerson {
  User: {
    email: string;
    avatar: string;
  };
  District?: {
    Municipality: {
      name: string;
      Department: {
        name: string;
      };
    };
  };
}
export interface Inscription {
  id: number;
  status: "Activo" | "Inactivo";
  Person: IGroupPerson;
}
export interface IGroupTable extends Omit<GroupInput, "zoneId"> {
  Zone?: ZoneInput;
  GroupLeader?: [
    {
      id: number;
      Person: IPerson;
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
export interface GroupTableProps {
  onEditGroup: (_data?: GroupInput | null) => void;
}

export interface GroupFormModalInput {
  isOpen: boolean;
  data?: any | null;
}

export interface GroupFormModalAction extends GroupFormModalInput {
  isOpenGroupFormModal: (_data?: any | null) => void;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
