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
 * @type {SignInInput}
 */
const initialValues: SignInInput = {
  email: "",
  passwd: ""
};

/**
 * Custom hook for managing sign-in form state and submission logic using Formik.
 *
 * This hook integrates Formik with NextAuth's `signIn` function to handle user authentication.
 * It encrypts sensitive credentials (email and password) before submission and manages
 * both successful responses and error handling through Formik helpers.
 *
 * **Features:**
 * - Client-side credential encryption (AES)
 * - Form validation with Yup schema
 * - Automatic redirect to dashboard on success
 * - Generic error messages for security
 * - Login attempt tracking with cooldown
 *
 * **Flow:**
 * 1. Validate form inputs against `credentialsSchema`
 * 2. Encrypt email and password using AES
 * 3. Call NextAuth signIn with encrypted credentials
 * 4. Handle success (redirect) or error (show message)
 *
 * @hook
 * @returns {FormikProps<ISignIn>} A Formik instance configured with:
 *   - `values`: Form values (email, passwd)
 *   - `errors`: Validation errors
 *   - `touched`: Touched fields
 *   - `handleChange`, `handleBlur`, `handleSubmit`: Form handlers
 *   - `isSubmitting`: Whether form is being submitted
 *   - `setFieldError`: Method to set field-level errors
 *
 * @example
 * ```tsx
 * // In a sign-in page component
 * const formik = useSignInForm();
 *
 * return (
 *   <form onSubmit={formik.handleSubmit}>
 *     <input
 *       name="email"
 *       value={formik.values.email}
 *       onChange={formik.handleChange}
 *     />
 *     {formik.errors.email && <span>{formik.errors.email}</span>}
 *     <button type="submit" disabled={formik.isSubmitting}>
 *       {formik.isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
 *     </button>
 *   </form>
 * );
 * ```
 *
 * @throws {Error} If the NextAuth credentials provider is not properly configured.
 * @throws {Error} If encryption utilities are not available.
 *
 * @see {@link ISignIn}
 * @see {@link SignInInput}
 * @see {@link credentialsSchema}
 * @see {@link useSignIn}
 * @see {@link encrypt}
 */
const useSignInForm = (): FormikProps<ISignIn> => {
  const router = useRouter();
  const { signInWithCredentials } = useSignIn();
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(0);

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
    /**
     * Submits the sign-in form using the `useSignIn` hook.
     *
     * **Security:**
     * - Email and password are encrypted client-side before transmission
     * - Encrypted credentials sent to NextAuth Credentials provider
     * - NextAuth handles CSRF protection and secure transmission
     * - Backend re-encrypts with additional layer of security
     *
     * **Process:**
     * 1. Check if in cooldown period (rate limiting)
     * 2. Encrypt email and password using AES-256
     * 3. Call NextAuth signIn with encrypted values
     * 4. On success: Redirect to dashboard (NextAuth handles)
     * 5. On error: Show generic error message
     *
     * @async
     * @param {SignInInput} values - Form values containing:
     *   - `email`: User email address
     *   - `passwd`: User password (will be encrypted)
     * @param {FormikHelpers<ISignIn>} formikHelpers - Formik helper methods:
     *   - `setFieldError(field, message)`: Set field-level error
     *   - `setSubmitting(boolean)`: Control submission state
     * @returns {Promise<void>}
     * @throws {Error} Caught and displayed to user via `setFieldError`
     *
     * @example
     * ```tsx
     * // Triggered by form onSubmit
     * const handleSubmit = async (values) => {
     *   // Automatically called by Formik
     *   // Result: User redirected or error shown
     * };
     * ```
     */

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

          setTimeout(() => {
            setCooldownSeconds((prev) => prev - 1);
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
