import { AxiosMessage, FormikProps } from "@/shared/types/globals";
import { ZoneInput } from "../zone/zoneType";

export interface GroupInput extends ZoneInput {
  description?: string;
  memberCount: number;
  zoneId: number;
  personId: number;
}

export type IGroup = GroupInput & AxiosMessage;

export interface GroupFormResult {
  groupFormik: FormikProps<IGroup>;
  reset: () => void;
  data: GroupInput | null;
}

export interface IPersonList extends Pick<ZoneInput, "id"> {
  fullName: string;
}

export interface GroupSelectBoxResult {
  zonesList: ZoneInput[];
  personList: IPersonList[];
}

export type IGroupColumnKey = "name" | "description" | "count" | "zone" | "actions";

export interface IGroupTable extends Omit<GroupInput, "zoneId" | "personId"> {
  Zone?: ZoneInput;
  Person?: {
    id: number;
  };

  _count?: {
    GroupMember: number;
  };
}
export interface GroupListResult {
  groupList: IGroupTable[];
  deleteGroup: (_groupId: number) => Promise<void>;
  setGroupsList: (_groups: IGroupTable[]) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GroupTableProps extends Pick<GroupListResult, "groupList" | "deleteGroup"> {
  onEditGroup: (_form: "Z" | "G", _data?: any | null) => void;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
