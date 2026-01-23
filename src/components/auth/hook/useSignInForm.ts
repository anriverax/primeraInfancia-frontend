import { FormikHelpers, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ISignIn, SignInInput } from "../type";
import { AxiosError } from "axios";
import { credentialsSchema as signInSchema } from "../signInValidation";
import { FormikProps } from "@/shared/types/globals";
import { encrypt, handleFormikResponseError } from "@/shared/utils/functions";
import { useSignIn } from "./useSignIn";
import { STATUS_CODES } from "@/shared/constants";
import { useState } from "react";

/**
 * Default initial values for the sign-in form.
 */
const initialValues: SignInInput = {
  email: "",
  passwd: ""
};

/**
 * Hook for managing sign-in form state, validation, and submission with progressive cooldown.
 * @returns Formik instance for form handling.
 */
const useSignInForm = (): FormikProps<ISignIn> => {
  const router = useRouter();
  const { signInWithCredentials } = useSignIn();

  /**
   * Handles form submission with encryption, authentication, and progressive cooldown on failed attempts.
   * @param values - Form input values (email and password).
   * @param formikHelpers - Formik helper functions for error handling.
   */
  const handleSubmit = async (
    values: SignInInput,
    formikHelpers: FormikHelpers<ISignIn>
  ): Promise<void> => {
    const encryptedEmail = encrypt(values.email);
    const encryptedPassword = encrypt(values.passwd);

    try {
      // Call custom hook for authentication
      const result = await signInWithCredentials(encryptedEmail, encryptedPassword);

      if (!result.ok) {
        const errorMessage = result.error || "Error inesperado. Por favor intenta de nuevo.";
        formikHelpers.setFieldError("axiosMessage", errorMessage);
        formikHelpers.setStatus(STATUS_CODES.UNAUTHORIZED);
        return;
      }

      // Success - redirect to dashboard
      router.push("/admin/dashboard/participantes");
    } catch (error) {
      handleFormikResponseError<ISignIn>(error as AxiosError, formikHelpers);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: signInSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useSignInForm };
