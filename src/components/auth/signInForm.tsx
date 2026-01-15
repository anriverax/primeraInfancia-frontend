import { User, Lock } from "lucide-react";
import { Button, Input } from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/form/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { ISignIn } from "./type";
import { memo } from "react";

/**
 * Props for the SignInForm component.
 * @property {FormikProps<ISignIn>} formik - Formik instance managing form state, validation, and submission.
 */
type SignInFormProps = {
  formik: FormikProps<ISignIn>;
};

/**
 * Sign-in form component for user authentication.
 *
 * Renders a form with email and password input fields, applying validation states and error messages.
 * The form integrates with Formik for state management and HeroUI for styling.
 * Memoized to prevent unnecessary re-renders when parent props haven't changed.
 *
 * **Performance Note:** This component is wrapped with `React.memo()` at module level to optimize
 * rendering and prevent focus loss issues during form interaction.
 *
 * @component
 * @param {SignInFormProps} props - Component props.
 * @param {FormikProps<ISignIn>} props.formik - Formik instance with sign-in form state.
 * @returns {React.JSX.Element} A form element with email and password inputs, and a submit button.
 *
 * @example
 * ```tsx
 * const formik = useSignInForm();
 * return <SignInForm formik={formik} />;
 * ```
 *
 * @see {@link useSignInForm}
 * @see {@link SignInFormProps}
 */
const SignInForm = memo(({ formik }: SignInFormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps } = formik;

  const { getInputProps } = useCustomFormFields();

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        {...getFieldProps("email")}
        {...getInputProps("email", "Correo Electrónico", touched.email, errors.email)}
        endContent={<User size={18} className="text-gray-400" />}
        autoComplete="email"
      />
      <Input
        {...getFieldProps("passwd")}
        {...getInputProps("password", "Contraseña", touched.passwd, errors.passwd)}
        endContent={<Lock size={18} className="text-gray-400" />}
      />

      <div className="mt-8">
        <Button
          fullWidth
          type="submit"
          color="primary"
          isLoading={isSubmitting}
          className="bg-gradient-to-b from-blue-800 to-blue-400"
        >
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
});

SignInForm.displayName = "SignInForm";

export default SignInForm;
