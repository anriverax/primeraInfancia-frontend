import { AxiosMessage } from "@/shared/types/globals";
import { MemoExoticComponent } from "react";

export interface SignInInput {
  email: string;
  passwd: string;
}

export type ISignIn = SignInInput & AxiosMessage;

export interface IAnimationViewResponse {
  id: string;
  Component: MemoExoticComponent<() => React.JSX.Element>;
}
