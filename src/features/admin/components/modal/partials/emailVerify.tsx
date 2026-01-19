import { Button, InputOtp, ModalBody } from "@heroui/react";
import ModalRegisterHeader from "../modalRegisterHeader";
import { MailCheck } from "lucide-react";
import ConditionalAlert from "@/shared/ui/conditionalAlert";
import { useCodeVerify } from "@/features/admin/hooks/useCodeVerify";

const EmailVerify = (): React.JSX.Element => {
  const formik = useCodeVerify();
  const { touched, errors, status, handleSubmit, setStatus } = formik;
  const badRequest = Boolean(status && status >= 400);

  return (
    <>
      <ModalRegisterHeader
        title="Verificar correo electrónico"
        description="Introduce el código de 6 dígitos enviado a tu correo electrónico"
        icon={<MailCheck className="h-6 w-6 text-gray-600" />}
      />
      <ModalBody>
        {Object.keys(errors).length > 0 && badRequest && (
          <ConditionalAlert status={status} errors={errors} setStatus={setStatus} />
        )}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <InputOtp
              length={6}
              variant="bordered"
              size="lg"
              allowedKeys="^[A-Za-z0-9]*$"
              classNames={{
                segment: ["border", "data-[active=true]:border-blue-500"]
              }}
              isInvalid={Boolean(touched.verifyCode && errors.verifyCode)}
              errorMessage={touched.verifyCode ? errors.verifyCode : undefined}
              {...formik.getFieldProps("verifyCode")}
            />
          </div>
          <div className="flex flex-row gap-2 py-4">
            <Button fullWidth type="submit" color="primary">
              Enviar
            </Button>
          </div>
        </form>
      </ModalBody>
    </>
  );
};

export default EmailVerify;
