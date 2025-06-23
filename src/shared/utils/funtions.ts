import { AnyObject, string, StringSchema } from "yup";
import { ERR_BAD_REQUEST } from "../constants";
import { AxiosError, AxiosResponse } from "axios";
import crypto from "crypto-js";

export const stringField = (requiredMessage: string): StringSchema<string, AnyObject, undefined, ""> =>
  string().required(requiredMessage);

export const encrypt = (plainText: string): string =>
  crypto.AES.encrypt(plainText, process.env.NEXT_PUBLIC_PLAIN_TEXT as string).toString();

export const formResponseError = (
  error: AxiosError,
  setStatus: (_status: number) => void,
  setFieldError: (_field: string, _message: string | undefined) => void
): void => {
  // Handle registration error.

  if (error.code === ERR_BAD_REQUEST) {
    // Extract error details from the Axios response.
    const { response } = error;
    if (response) {
      const { data } = response as AxiosResponse;
      const { statusCode, message } = data;

      // Set form status and field error.
      setStatus(statusCode);
      setFieldError("axiosMessage", message);
    } else {
      // Handle non-Axios error (e.g., network error)
      setStatus(400);
      setFieldError("axiosMessage", `Network error: ${error}`);
    }
  } else {
    // Handle non-Axios error (e.g., network error)
    setStatus(500);
    setFieldError("axiosMessage", error.message);
  }
};
