import { AxiosMessage } from "@/shared/types/globals";
import { MemoExoticComponent } from "react";

export interface SignInSchema {
  email: string;
  passwd: string;
}

export type SingInData = SignInSchema & AxiosMessage;

export interface DataVisLoginFormResponse {
  id: string;
  Component: MemoExoticComponent<() => React.JSX.Element>;
}
