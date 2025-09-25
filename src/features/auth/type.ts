import { AxiosMessage } from "@/shared/types/globals";
import { MemoExoticComponent } from "react";

export interface SignInInput {
  email: string;
  passwd: string;
  newValueDate: Date;
}

export type ISignIn = SignInInput & AxiosMessage;

export interface IAnimationViewResult {
  id: string;
  Component: MemoExoticComponent<() => React.JSX.Element>;
}
