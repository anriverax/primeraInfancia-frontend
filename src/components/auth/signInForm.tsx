import { User, Lock } from "lucide-react";
import { Button, Input } from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/form/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { ISignIn } from "./type";
import { memo } from "react";

/**
 * Props for SignInForm.
 * @property formik - Formik instance for managing form state and submission.
 */
type SignInFormProps = {
  formik: FormikProps<ISignIn>;
};

/**
 * Sign-in form with email and password inputs, validation feedback, and submit button.
 * @param props - Component props.
 * @returns Rendered form component.
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
        <Button fullWidth type="submit" isLoading={isSubmitting} className="bg-primary-500 text-white">
          Iniciar sesión
        </Button>
      </div>
    </form>
  );
});

SignInForm.displayName = "SignInForm";

export default SignInForm;
