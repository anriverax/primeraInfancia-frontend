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
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(0);

  /**
   * Handles form submission with encryption, authentication, and progressive cooldown on failed attempts.
   * @param values - Form input values (email and password).
   * @param formikHelpers - Formik helper functions for error handling.
   */
  const handleSubmit = async (
    values: SignInInput,
    formikHelpers: FormikHelpers<ISignIn>
  ): Promise<void> => {
    if (cooldownSeconds > 0) {
      formikHelpers.setFieldError(
        "axiosMessage",
        `Por favor espera ${cooldownSeconds}s antes de intentar de nuevo`
      );
      return;
    }

    const encryptedEmail = encrypt(values.email);
    const encryptedPassword = encrypt(values.passwd);

    try {
      // Call custom hook for authentication
      const result = await signInWithCredentials(encryptedEmail, encryptedPassword);

      if (!result.ok) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        // ✅ Cooldown progresivo
        if (newAttempts >= 3) {
          const cooldown = Math.min(newAttempts * 10, 120); // Max 2 minutes

          setCooldownSeconds(cooldown);

          // Countdown timer que decrementa cada segundo
          const countdownInterval = setInterval(() => {
            setCooldownSeconds((prev) => {
              if (prev <= 1) {
                clearInterval(countdownInterval);
                return 0; // Cooldown terminó
              }
              return prev - 1;
            });
          }, 1000);
        }

        const errorMessage = result.error || "Error inesperado. Por favor intenta de nuevo.";
        formikHelpers.setFieldError("axiosMessage", errorMessage);
        formikHelpers.setStatus(STATUS_CODES.UNAUTHORIZED);
        return;
      }

      // Success - reset attempts
      setLoginAttempts(0);
      setCooldownSeconds(0);

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
