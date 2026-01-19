import { Button, Input, Radio, RadioGroup, Textarea } from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/form/useCustomFormFields";
import { AttendanceEnum, radioStyles } from "@/shared/constants";
import { AttStepTwoInput } from "../attendance.type";
import { FormikProps } from "@/shared/types/globals";
type AttFormStepTwoProps = {
  formikStepTwo: FormikProps<AttStepTwoInput>;
  children: React.ReactNode;
  handlePrev: () => void;
};

const AttFormStepTwo = ({
  formikStepTwo,
  children,
  handlePrev
}: AttFormStepTwoProps): React.JSX.Element => {
  const { getTextAreaProps, getInputProps, getRadioGroupProps } = useCustomFormFields();
  const { values, touched, errors, getFieldProps, handleSubmit, setFieldValue } = formikStepTwo;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <RadioGroup
        {...getRadioGroupProps("Seleccione una opción", !!errors.status, errors.status)}
        value={values.status}
        onValueChange={(value: string) => {
          setFieldValue("comment", "");
          setFieldValue("justificationUrl", "");
          setFieldValue("status", value);
        }}
      >
        <Radio value={AttendanceEnum.PRESENTE} classNames={{ ...radioStyles }}>
          {AttendanceEnum.PRESENTE}
        </Radio>
        <Radio value={AttendanceEnum.AUSENTE} classNames={{ ...radioStyles }}>
          {AttendanceEnum.AUSENTE}
        </Radio>
      </RadioGroup>
      {values.status?.toString() === AttendanceEnum.AUSENTE && (
        <div className="space-y-6">
          <Textarea
            {...getTextAreaProps(
              "Comentarios",
              "Escriba un comentario...",
              touched.comment,
              errors.comment
            )}
            {...getFieldProps("comment")}
          />
          <Input
            {...getFieldProps("justificationUrl")}
            {...getInputProps(
              "url",
              "Url de justificación",
              touched.justificationUrl,
              errors.justificationUrl
            )}
            description="Ejemplos: https://oei365-my.sharepoint.com/... ó https://oei365.sharepoint.com/..."
          />
        </div>
      )}
      {children}
      <div className="flex justify-between">
        <Button variant="bordered" onPress={handlePrev}>
          Atras
        </Button>
        <Button className="btn-primary">Guardar</Button>
      </div>
    </form>
  );
};

export default AttFormStepTwo;
