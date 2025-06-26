import { AxiosMessage, FormikProps } from "@/shared/types/globals";
import { ZoneInput } from "../zone/zoneType";

export interface GroupInput extends ZoneInput {
  description?: string;
  memberCount: number;
  zoneId: number;
  personId: number;
}

export type IGroup = GroupInput & AxiosMessage;

export interface GroupFormResponse {
  groupFormik: FormikProps<IGroup>;
  reset: () => void;
  data: GroupInput | null;
}
