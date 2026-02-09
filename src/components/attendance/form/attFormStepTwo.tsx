import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  SharedSelection,
  Textarea
} from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/form/useCustomFormFields";
import { AttendanceEnum, radioStyles } from "@/shared/constants";
import { AttStepTwoInput, EventList, IEvent } from "../attendance.type";
import { FormikProps } from "@/shared/types/globals";
import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
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
  const { getTextAreaProps, getInputProps, getSelectProps, getRadioGroupProps } = useCustomFormFields();
  const { values, touched, errors, getFieldProps, handleSubmit, setFieldValue } = formikStepTwo;

  const { data: classificationList } = useApiQuery<EventList[]>({
    key: `event-class`,
    endpoint: "/attendance/me/classification",
    enabled: values.status?.toString() === AttendanceEnum.AUSENTE,
    description: "listado de clasificaciones de eventos"
  });

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
          {classificationList && (
            <Select
              items={classificationList ?? []}
              name="classificationId"
              scrollShadowProps={{
                hideScrollBar: false
              }}
              {...getSelectProps(
                "Evento",
                "Seleccione un eventos",
                classificationList.length ?? 0,
                values.classificationId!,
                errors.classificationId
              )}
              onSelectionChange={(keys: SharedSelection) => {
                const selected = Array.from(keys as Set<string>)[0];
                const id = selected ? Number(selected) : -1;
                setFieldValue("classificationId", id);
              }}
            >
              {(classificationList ?? []).map((event: IEvent) => (
                <SelectItem key={event.id}>{event.name}</SelectItem>
              ))}
            </Select>
          )}
        </div>
      )}
      {children}
      <div className="flex justify-between">
        <Button variant="bordered" onPress={handlePrev}>
          Atras
        </Button>
        <Button className="btn-primary" type="submit">
          Guardar
        </Button>
      </div>
    </form>
  );
};

export default AttFormStepTwo;
