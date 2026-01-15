import { FormikHelpers, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ISignIn, SignInInput } from "../type";
import { AxiosError } from "axios";
import { credentialsSchema as signInSchema } from "../signInValidation";
import { FormikProps } from "@/shared/types/globals";
import { encrypt, handleFormikResponseError } from "@/shared/utils/functions";
import { useSignIn } from "./useSignIn";

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
 * @returns {FormikProps<ISignIn>} A Formik instance configured with sign-in validation schema,
 *                                  initial values, and custom submit handler.
 *
 * @example
 * ```tsx
 * const formik = useSignInForm();
 * return <SignInForm formik={formik} />;
 * ```
 *
 * @throws {Error} If the NextAuth credentials provider is not properly configured.
 * @throws {Error} If encryption utilities are not available.
 *
 * @see {@link ISignIn}
 * @see {@link SignInInput}
 * @see {@link signInSchema}
 */
const useSignInForm = (): FormikProps<ISignIn> => {
  const router = useRouter();
  const { signInWithCredentials } = useSignIn();

  const handleSubmit = async (
    values: SignInInput,
    formikHelpers: FormikHelpers<ISignIn>
  ): Promise<void> => {
    /**
     * Submits the sign-in form using the `useSignIn` hook.
     *
     * **Flow:**
     * 1. Encrypt email and password on client
     * 2. Call NextAuth signIn via hook
     * 3. Redirect on success or show error on failure
     *
     * **Security Benefits:**
     * - Credentials handled by NextAuth client
     * - CSRF protection built-in
     * - Automatic session management
     *
     * @param {SignInInput} values - Form values containing email and password.
     * @param {FormikHelpers<ISignIn>} formikHelpers - Formik helper methods for error handling.
     * @returns {Promise<void>}
     */

    const encryptedEmail = encrypt(values.email);
    const encryptedPassword = encrypt(values.passwd);

    try {
      // Call custom hook for authentication
      const result = await signInWithCredentials(encryptedEmail, encryptedPassword);

      if (!result.ok) {
        // Set error message
        formikHelpers.setFieldError("axiosMessage", result.error);
        formikHelpers.setStatus(401);
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
