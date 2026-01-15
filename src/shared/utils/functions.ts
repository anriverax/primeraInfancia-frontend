import { AnyObject, string, StringSchema, number, NumberSchema } from "yup";
import { ERR_BAD_REQUEST, TypeRole } from "../constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import crypto from "crypto-js";
import { FormikHelpers } from "formik";
import { addToast } from "@heroui/react";
import Swal from "sweetalert2";
import { Session } from "next-auth";

/**
 * Creates a Yup string schema that is required with a custom message.
 *
 * @param requiredMessage - The message shown when the field is empty.
 * @returns A Yup StringSchema with the required rule applied.
 */
export const stringField = (requiredMessage: string): StringSchema<string, AnyObject, undefined, ""> =>
  string().required(requiredMessage);

/**
 * Creates a Yup number schema that is required with a custom message.
 *
 * @param requiredMessage - The message shown when the field is empty.
 * @returns A Yup NumberSchema with the required rule applied.
 */
export const numberField = (requiredMessage: string): NumberSchema<number, AnyObject, undefined, ""> =>
  number().required(requiredMessage);

/**
 * Encrypts a plain text string using AES with the configured environment key.
 *
 * NOTE: This function is a convenience wrapper over the `crypto-js` AES implementation.
 * The key is taken from `process.env.NEXT_PUBLIC_PLAIN_TEXT` and must be available at runtime.
 *
 * @param plainText - The text to encrypt.
 * @returns The encrypted cipher text as a base64 string.
 */
export const encrypt = (plainText: string): string =>
  crypto.AES.encrypt(plainText, process.env.NEXT_PUBLIC_PLAIN_TEXT as string).toString();

/**
 * Normalize and handle errors coming from an Axios response inside a Formik form.
 *
 * This will set the Formik status and assign a field-level error named `axiosMessage`.
 * Behavior:
 * - If the Axios error corresponds to a bad request (ERR_BAD_REQUEST), it will extract
 *   the `statusCode` and `message` from the response body and use them to set the form state.
 * - If no response is present or the error is not a bad request, it sets a generic error status/message.
 *
 * @param error - The AxiosError instance captured from a failed request.
 * @param formikHelpers - The Formik helpers object used to set status and field errors.
 */
export function handleFormikResponseError<T>(error: AxiosError, formikHelpers: FormikHelpers<T>): void {
  const { setStatus, setFieldError } = formikHelpers;

  if (error.code === ERR_BAD_REQUEST) {
    // Extract error details from the Axios response when available.
    const { response } = error;
    if (response) {
      const { data } = response as AxiosResponse;
      const { statusCode, message } = data;

      setStatus(statusCode);
      setFieldError("axiosMessage", message);
    } else {
      // Network issue or no response provided by the server.
      setStatus(400);
      setFieldError("axiosMessage", `Network error: ${error}`);
    }
  } else {
    // Non 400 error paths: mark as server/internal error and set message.
    setStatus(500);
    setFieldError("axiosMessage", error.message);
  }
}

/**
 * Show a toast notification using the project's toast helper.
 *
 * This wrapper normalizes the color to lowercase and forwards the message
 * and classNames to the underlying `addToast` implementation.
 *
 * @param message - The textual message to display in the toast.
 * @param color - One of the allowed semantic colors for the toast.
 */
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

/**
 * Generic Axios error handler that logs (in development) and shows a toast.
 *
 * @param error - The thrown error (may be an Axios error or any other type).
 * @param message - A human readable message describing the operation that failed.
 * @param action - Action type used to compose the toast title (keeps existing Spanish action values).
 */
export function handleAxiosError(
  error: unknown,
  message: string,
  action: "obtener" | "eliminar" | "actualizar"
): void {
  const isAxios = axios.isAxiosError(error);
  const isDev = process.env.NEXT_PUBLIC_NODE_ENV_ENV === "development";
  const title = isAxios ? `Error al ${action}` : `Error inesperado al ${action}`;

  const detail = isAxios ? error.response?.data || error.message : (error as Error).message || error;

  /* eslint-disable no-console */
  if (isDev) console.error(`${title} ${message}:`, detail);
  /* eslint-enable no-console */

  showToast(`${title} ${message}`, "danger");
}

/**
 * Shows a confirmation dialog using SweetAlert2 and returns whether the user confirmed.
 *
 * Options and default texts are kept in Spanish to match the existing UI strings.
 *
 * @param options - Optional overrides for dialog title, text and confirm button text.
 * @returns A promise that resolves to true when the user confirms, false otherwise.
 */
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

/**
 * Parse a query parameter value to a number id or return undefined when invalid.
 *
 * Accepts either a string, an array of strings (first element used) or undefined.
 *
 * @param queryId - The raw query id from Next.js router/query object.
 * @returns The parsed number id or undefined when parsing fails.
 */
export function getIdParam(queryId: string | string[] | undefined): number | undefined {
  const idParam = Array.isArray(queryId) ? parseInt(queryId[0], 10) : parseInt(queryId ?? "", 10);
  return isNaN(idParam) ? undefined : idParam;
}

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
/**
 * Safely retrieve a nested property value from an object using a dot-separated path.
 *
 * Example: getNestedValue(obj, 'user.profile.name')
 *
 * Note: This utility intentionally uses `any` to remain generic.
 */
export const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */

/**
 * Determine whether the session corresponds to a non-mentor/formador role.
 *
 * Returns `false` for FORMADOR or MENTOR and `true` otherwise. The function
 * preserves the original behavior and uses the project's `TypeRole` enum.
 *
 * @param session - The NextAuth session object (may be null).
 * @returns boolean indicating whether the session role is not FORMADOR or MENTOR.
 */
export const isRolAdmin = (session: Session | null): boolean => {
  const role = session?.user.role;

  // Return false if role is FORMADOR or MENTOR, true in any other case
  return ![TypeRole.USER_FORMADOR, TypeRole.USER_MENTOR].includes(role as TypeRole);
};
