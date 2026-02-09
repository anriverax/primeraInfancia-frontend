import { Button, Radio, RadioGroup, Select, SelectItem, SharedSelection } from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/form/useCustomFormFields";
import { AttendanceModeEnum, radioStyles } from "@/shared/constants";
import { AttStepOneInput, IEvent, SupportList } from "../attendance.type";
import { FormikProps } from "@/shared/types/globals";

type AttFormStepOneProps = {
  formikStepOne: FormikProps<AttStepOneInput>;
  supportList: SupportList[];
  assignmentList: IEvent[];
  onClose: () => void;
};

const AttFormStepOne = ({
  formikStepOne,
  supportList,
  assignmentList,
  onClose
}: AttFormStepOneProps): React.JSX.Element => {
  const { getSelectProps, getRadioGroupProps } = useCustomFormFields();

  const { values, errors, handleSubmit, setFieldValue } = formikStepOne;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <RadioGroup
        {...getRadioGroupProps(
          "Eres el responsable del evento?",
          !!errors.isResponsible,
          errors.isResponsible
        )}
        value={values.isResponsible}
        onValueChange={(value: string) => setFieldValue("isResponsible", value)}
      >
        <Radio value="true" classNames={{ ...radioStyles }}>
          Si
        </Radio>
        <Radio value="false" classNames={{ ...radioStyles }}>
          No
        </Radio>
      </RadioGroup>
      <Select
        items={supportList ?? []}
        name="supportId"
        scrollShadowProps={{
          hideScrollBar: false
        }}
        {...getSelectProps(
          "Responsable",
          "Seleccione responsable del evento",
          supportList.length ?? 0,
          values.supportId,
          errors.supportId
        )}
        isDisabled={supportList.length <= 1}
        onSelectionChange={(keys: SharedSelection) => {
          const selected = Array.from(keys as Set<string>)[0];
          const id = selected ? Number(selected) : -1;
          setFieldValue("supportId", id);
          setFieldValue("eventInstanceId", -1);
        }}
      >
        {(supportList ?? []).map((support: SupportList) => (
          <SelectItem key={support.id}>{support.fullName}</SelectItem>
        ))}
      </Select>
      <Select
        items={assignmentList ?? []}
        name="eventInstanceId"
        scrollShadowProps={{
          hideScrollBar: false
        }}
        {...getSelectProps(
          "Evento",
          "Seleccione un eventos",
          assignmentList.length ?? 0,
          values.eventInstanceId,
          errors.eventInstanceId
        )}
        onSelectionChange={(keys: SharedSelection) => {
          const selected = Array.from(keys as Set<string>)[0];
          const id = selected ? Number(selected) : -1;
          setFieldValue("eventInstanceId", id);
        }}
      >
        {(assignmentList ?? []).map((event: IEvent) => (
          <SelectItem key={event.id}>{event.name}</SelectItem>
        ))}
      </Select>
      <div className="flex justify-between gap-4">
        <RadioGroup
          {...getRadioGroupProps("Seleccione una modalidad", !!errors.modality, errors.modality)}
          value={values.modality}
          onValueChange={(value: string) => setFieldValue("modality", value)}
        >
          <Radio value={AttendanceModeEnum.PRESENCIAL} classNames={{ ...radioStyles }}>
            {AttendanceModeEnum.PRESENCIAL}
          </Radio>
          <Radio value={AttendanceModeEnum.VIRTUAL} classNames={{ ...radioStyles }}>
            {AttendanceModeEnum.VIRTUAL}
          </Radio>
        </RadioGroup>
      </div>
      <div className="flex justify-between">
        <Button variant="bordered" onPress={onClose}>
          Cerrar
        </Button>
        <Button className="btn-primary" type="submit">
          Siguiente
        </Button>
      </div>
    </form>
  );
};

export default AttFormStepOne;
