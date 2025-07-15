import { AxiosMessage, FormikProps, IPagination } from "@/shared/types/globals";
import { ZoneInput } from "../zone/zoneType";
import { Dispatch, SetStateAction } from "react";

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
  zonesList: ZoneInput[] | [];
  personList: IPersonList[];
}

export type IGroupColumnKey = "name" | "count" | "zone" | "actions";

export interface IGroupTable extends Omit<GroupInput, "zoneId" | "personId"> {
  Zone?: ZoneInput;
  Person?: IPersonList;

  _count?: {
    GroupMember: number;
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
  onEditGroup: (_data?: any | null) => void;
}

export interface GroupModalInput {
  isVisible: boolean;
  data?: any | null;
}

export interface GroupModalAction extends GroupModalInput {
  toggleVisibility: (_data?: any | null) => void;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
