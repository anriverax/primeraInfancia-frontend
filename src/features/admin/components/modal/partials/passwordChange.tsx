import { useCustomFormFields } from "@/shared/hooks/form/useCustomFormFields";
import { Button, Input, ModalBody } from "@heroui/react";
import { KeyIcon } from "lucide-react";
import ModalRegisterHeader from "../modalRegisterHeader";
import { usePasswordChange } from "@/features/admin/hooks/usePasswordChange";
import { usePasswdVisible } from "@/features/admin/hooks/usePasswdVisible";
import ConditionalAlert from "@/components/ui/conditionalAlert";

const PasswordChange = (): React.JSX.Element => {
  const formikPasswd = usePasswordChange();
  const { handleSubmit, touched, errors, getFieldProps, isSubmitting, status, setStatus } = formikPasswd;
  const { getInputProps } = useCustomFormFields();

  const [isPasswordVisible1, PasswordVisible1] = usePasswdVisible();
  const [isPasswordVisible2, PasswordVisible2] = usePasswdVisible();
  const [isPasswordVisible3, PasswordVisible3] = usePasswdVisible();

  return (
    <>
      <ModalRegisterHeader
        title="Cambiar contraseña"
        imageSrc=""
        icon={<KeyIcon className="h-6 w-6 text-gray-600" />}
      />
      <ModalBody>
        {Object.keys(errors).length > 0 && status === 401 && (
          <ConditionalAlert status={status} errors={errors} setStatus={setStatus} />
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            {...getFieldProps("email")}
            {...getInputProps("email", "Correo electrónico institucional", touched.email, errors.email)}
            autoComplete="email"
          />
          <Input
            {...getFieldProps("currentPassword")}
            {...getInputProps(
              isPasswordVisible1 ? "text" : "password",
              "Contraseña temporal",
              touched.currentPassword,
              errors.currentPassword
            )}
            {...PasswordVisible1}
          />
          <Input
            {...getFieldProps("newPassword")}
            {...getInputProps(
              isPasswordVisible2 ? "text" : "password",
              "Contraseña nueva",
              touched.newPassword,
              errors.newPassword
            )}
            {...PasswordVisible2}
          />
          <Input
            {...getFieldProps("confirmNewPassword")}
            {...getInputProps(
              isPasswordVisible3 ? "text" : "password",
              "Confirmar contraseña",
              touched.confirmNewPassword,
              errors.confirmNewPassword
            )}
            {...PasswordVisible3}
          />
          <div className="flex flex-row gap-2 py-4">
            <Button fullWidth type="submit" color="primary" isLoading={isSubmitting}>
              Cambiar contraseña
            </Button>
          </div>
        </form>
      </ModalBody>
    </>
  );
};

export default PasswordChange;
