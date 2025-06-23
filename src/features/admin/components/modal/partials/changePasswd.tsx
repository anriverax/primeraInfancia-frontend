import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { Button, Input, ModalBody } from "@heroui/react";
import { KeyIcon } from "lucide-react";
import ModalHeaderCustom from "../ModalHeaderCustom";
import { useChangePasswd } from "@/features/admin/hooks/useChangePasswd";
import { usePasswdVisible } from "@/features/admin/hooks/store/usePasswdVisible";

const ChangePasswd = (): React.JSX.Element => {
  const formikPasswd = useChangePasswd();
  const { handleSubmit, touched, errors, getFieldProps, isSubmitting } = formikPasswd;
  const { getInputProps } = useCustomFormFields();

  const [isVisiblePsswd1, visiblePsswd1] = usePasswdVisible();
  const [isVisiblePsswd2, visiblePsswd2] = usePasswdVisible();
  const [isVisiblePsswd3, visiblePsswd3] = usePasswdVisible();

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
              isVisiblePsswd1 ? "text" : "password",
              "Contraseña temporal",
              touched.currentPassword,
              errors.currentPassword
            )}
            {...visiblePsswd1}
          />
          <Input
            {...getFieldProps("newPassword")}
            {...getInputProps(
              isVisiblePsswd2 ? "text" : "password",
              "Contraseña nueva",
              touched.newPassword,
              errors.newPassword
            )}
            {...visiblePsswd2}
          />
          <Input
            {...getFieldProps("confirmNewPassword")}
            {...getInputProps(
              isVisiblePsswd3 ? "text" : "password",
              "Confirmar contraseña",
              touched.confirmNewPassword,
              errors.confirmNewPassword
            )}
            {...visiblePsswd3}
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

export default ChangePasswd;
