import { AnyObject, string, StringSchema } from "yup";
import { ERR_BAD_REQUEST } from "../constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import crypto from "crypto-js";
import { FormikHelpers } from "formik";
import { addToast } from "@heroui/react";

export const stringField = (requiredMessage: string): StringSchema<string, AnyObject, undefined, ""> =>
  string().required(requiredMessage);

export const encrypt = (plainText: string): string =>
  crypto.AES.encrypt(plainText, process.env.NEXT_PUBLIC_PLAIN_TEXT as string).toString();

export function handleFormikResponseError<T>(error: AxiosError, formikHelpers: FormikHelpers<T>): void {
  // Handle registration error.
  const { setStatus, setFieldError } = formikHelpers;

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
}

export function showToast(
  message: string,
  severity: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
): void {
  const color =
    severity === "success"
      ? "text-green-500"
      : severity === "danger"
        ? "text-red-500"
        : severity === "warning"
          ? "text-yellow-500"
          : severity === "primary"
            ? "text-blue-500"
            : severity === "secondary"
              ? "text-gray-500"
              : "text-gray-700";

  addToast({
    title: message,
    severity,
    variant: "bordered",
    classNames: {
      icon: `w-6 h-6 fill-current ${color}`
    }
  });
}
export function handleAxiosError(error: unknown, message: string, action: "obtener" | "eliminar"): void {
  const isAxios = axios.isAxiosError(error);
  const isDev = process.env.NODE_ENV === "development";
  const title = isAxios ? `Error al ${action}` : `Error inesperado al ${action}`;

  const detail = isAxios ? error.response?.data || error.message : (error as Error).message || error;

  if (isDev) {
    /* eslint-disable no-console */
    console.error(`${title} ${message}:`, detail);
    /* eslint-enable no-console */
  } else showToast(`${title} ${message}`, "danger");
}
