import { AnyObject, string, StringSchema, number, NumberSchema } from "yup";
import { ERR_BAD_REQUEST, TypeRole } from "../constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import crypto from "crypto-js";
import { FormikHelpers } from "formik";
import { addToast } from "@heroui/react";
import Swal from "sweetalert2";
import { Session } from "next-auth";

export const stringField = (requiredMessage: string): StringSchema<string, AnyObject, undefined, ""> =>
  string().required(requiredMessage);

export const numberField = (requiredMessage: string): NumberSchema<number, AnyObject, undefined, ""> =>
  number().required(requiredMessage);

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
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
): void {
  const lowerColor = color.toLowerCase() as
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";

  addToast({
    title: message,
    color: lowerColor,
    classNames: {
      icon: `w-6 h-6 fill-current ${lowerColor}`
    }
  });
}

export function handleAxiosError(
  error: unknown,
  message: string,
  action: "obtener" | "eliminar" | "actualizar"
): void {
  const isAxios = axios.isAxiosError(error);
  const isDev = process.env.NODE_ENV === "development";
  const title = isAxios ? `Error al ${action}` : `Error inesperado al ${action}`;

  const detail = isAxios ? error.response?.data || error.message : (error as Error).message || error;

  /* eslint-disable no-console */
  if (isDev) console.error(`${title} ${message}:`, detail);
  /* eslint-enable no-console */

  showToast(`${title} ${message}`, "danger");
}

export async function confirmAction(options?: {
  title?: string;
  text?: string;
  btnText?: string;
}): Promise<boolean> {
  const {
    title = "¿Estás seguro?",
    text = "Esta acción no se puede deshacer.",
    btnText = "Sí, eliminar"
  } = options || {};

  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#006eeb",
    cancelButtonColor: "#d33",
    confirmButtonText: btnText,
    cancelButtonText: "Cancelar"
  });

  return result.isConfirmed;
}

export function getIdParam(queryId: string | string[] | undefined): number | undefined {
  const idParam = Array.isArray(queryId) ? parseInt(queryId[0], 10) : parseInt(queryId ?? "", 10);
  return isNaN(idParam) ? undefined : idParam;
}
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
export const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

export const getTypeRole = (session: Session | null): boolean => {
  const role = session?.user.role;

  // Retorn false if its FORMADOR o MENTOR, true en any other case
  return ![TypeRole.USER_FORMADOR, TypeRole.USER_MENTOR].includes(role as TypeRole);
};
