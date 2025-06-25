import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { Button, Input, ModalBody } from "@heroui/react";
import { KeyIcon } from "lucide-react";
import ModalHeaderCustom from "../ModalHeaderCustom";
import { usePasswordChange } from "@/features/admin/hooks/usePasswordChange";
import { usePasswdVisible } from "@/features/admin/hooks/usePasswdVisible";

const PasswordChange = (): React.JSX.Element => {
  const formikPasswd = usePasswordChange();
  const { handleSubmit, touched, errors, getFieldProps, isSubmitting } = formikPasswd;
  const { getInputProps } = useCustomFormFields();

  const [isPasswordVisible1, PasswordVisible1] = usePasswdVisible();
  const [isPasswordVisible2, PasswordVisible2] = usePasswdVisible();
  const [isPasswordVisible3, PasswordVisible3] = usePasswdVisible();

  return (
    <>
      <ModalHeaderCustom
        title="Cambiar contraseña"
        description="Ingresa tu contraseña temporal y crea una nueva contraseña segura"
        icon={<KeyIcon className="h-6 w-6 text-gray-600" />}
      />
      <ModalBody>
        <form className="space-y-6" onSubmit={handleSubmit}>
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
