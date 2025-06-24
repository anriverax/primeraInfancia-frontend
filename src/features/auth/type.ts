import { AxiosMessage } from "@/shared/types/globals";
import { MemoExoticComponent } from "react";

export interface ISignIn {
  email: string;
  passwd: string;
}

export type SingInInput = ISignIn & AxiosMessage;

export interface IAnimationView {
  id: string;
  Component: MemoExoticComponent<() => React.JSX.Element>;
}
