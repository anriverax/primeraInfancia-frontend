import { AxiosMessage } from "@/shared/types/globals";
import { MemoExoticComponent } from "react";

/** Sign-in form input fields. */
export interface SignInInput {
  email: string;
  passwd: string;
}

/** Sign-in form type with axios message handling. */
export type ISignIn = SignInInput & AxiosMessage;

/** Animation component result with id and memoized component. */
export interface IAnimationViewResult {
  id: string;
  Component: MemoExoticComponent<() => React.JSX.Element>;
}
