import { Button, DatePicker, Select, SelectItem, SharedSelection, Textarea } from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/form/useCustomFormFields";
import { useAgendaFormStepOne } from "./hook/useAgendaFormStepOne";
import { useAgendaSelectValues } from "../hook/useAgendaSelectValues";
import { extractIdFromSelection } from "@/shared/utils/functions";
import { SelectList } from "@/shared/types/globals";
import { PlannedEventType } from "../agenda.type";

type AgendaFormStepOneProps = {
  plannedEventData: PlannedEventType;
  onSuccess: (id: number) => void;
  onClose: () => void;
};

const AgendaFormStepOne = ({
  plannedEventData,
  onSuccess,
  onClose
}: AgendaFormStepOneProps): React.JSX.Element => {
  const formikStepOne = useAgendaFormStepOne(onSuccess, plannedEventData);

  const { trainingModuleList, assignmentList } = useAgendaSelectValues();

  const { getSelectProps, getDateProps, getTextAreaProps } = useCustomFormFields();

  const { values, errors, touched, handleSubmit, setFieldValue, getFieldProps } = formikStepOne;

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Select
        aria-label="Seleccionar opción"
        items={trainingModuleList ?? []}
        popoverProps={{
          shouldBlockScroll: false
        }}
        name="trainingModuleId"
        scrollShadowProps={{
          hideScrollBar: false
        }}
        {...getSelectProps(
          "Módulo de formación",
          "Seleccione un módulo",
          trainingModuleList.length ?? 0,
          values.trainingModuleId,
          errors.trainingModuleId
        )}
        isDisabled={trainingModuleList.length <= 1}
        onSelectionChange={(keys: SharedSelection) => {
          setFieldValue("trainingModuleId", extractIdFromSelection(keys));
        }}
      >
        {(trainingModuleList ?? []).map((trainingModule: SelectList) => (
          <SelectItem key={trainingModule.id}>{trainingModule.name}</SelectItem>
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
          setFieldValue("eventInstanceId", extractIdFromSelection(keys));
        }}
      >
        {(assignmentList ?? []).map((event: SelectList) => (
          <SelectItem key={event.id}>{event.name}</SelectItem>
        ))}
      </Select>
      <DatePicker
        hideTimeZone
        showMonthAndYearPickers
        {...getDateProps(values.start, "start", "Fecha de seguimiento", touched.start, errors.start)}
        granularity="minute"
        hourCycle={12}
        onChange={(date) => {
          setFieldValue("start", date);
        }}
      />
      <Textarea
        {...getTextAreaProps(
          "Descripción",
          "Escriba un comentario...",
          touched.description,
          errors.description,
          false
        )}
        {...getFieldProps("description")}
      />
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

export default AgendaFormStepOne;
