import { User, Lock } from "lucide-react";
import { Button, Input, DatePicker } from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { ISignIn } from "../type";

type SignInFormProps = {
  formik: FormikProps<ISignIn>;
};

const SignInForm = ({ formik }: SignInFormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps } = formik;

  const { getInputProps, getDateProps } = useCustomFormFields();

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
      <DatePicker 
      {...getFieldProps("newValueDate")}
      {...getDateProps("newValueDate", "Fecha de Nacimiento", touched?.newValueDate, errors.newValueDate)} />
      <div className="mt-8">
        <Button fullWidth type="submit" color="primary" isLoading={isSubmitting}>
          Iniciar Sesión
        </Button>
      </div>
      {/* 
      <div className="mt-8">
        <Button fullWidth type="submit" color="primary" isLoading={isSubmitting}>
          Iniciar Sesión
        </Button>
      </div> */}
    </form>
  );
};

export default SignInForm;
