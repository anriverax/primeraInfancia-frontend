import { ModalBody } from "@heroui/react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { CalendarCheck } from "lucide-react";
import StepIndicator from "@/components/ui/common/step/stepIndicatior";
import AgendaFormStepTwo from "./agendaFormStepTwo";
import AgendaFormStepOne from "./agendaFormStepOne";
import { usePlannedEvent } from "../hook/usePlannedEvent";
import { ModalHeaderContent } from "@/components/ui/modal/modalHeaderCustom";
import { PlannedEventType } from "../agenda.type";

type AgendaFormProps = {
  onClose: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  currentStep: number;
  steps: string[];
  plannedTempId: number;
  setplannedTempId: Dispatch<SetStateAction<number>>;
};

const AgendaForm = ({
  onClose,
  handleNext,
  handlePrev,
  currentStep,
  steps,
  plannedTempId,
  setplannedTempId
}: AgendaFormProps): React.JSX.Element => {
  const { plannedEventData, refetch } = usePlannedEvent(
    plannedTempId,
    `plannedEvent-${plannedTempId}-edit`,
    `/plannedEvent/me/${plannedTempId}`
  );

  /* eslint-disable react-hooks/exhaustive-deps  */
  const onSuccess = useCallback((id: number) => {
    setplannedTempId(id);
    refetch();
    handleNext();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps  */

  return (
    <>
      <ModalHeaderContent
        title="Planificar evento"
        imageSrc="/titles/plannedEvent.svg"
        icon={<CalendarCheck className="h-6 w-6 text-neutral-600" />}
        variant="modal"
      />

      <ModalBody className="p-10">
        <StepIndicator currentStep={currentStep} steps={steps} />
        {currentStep === 0 && (
          <AgendaFormStepOne
            plannedEventData={plannedEventData! as PlannedEventType}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        )}
        {currentStep === 1 && plannedEventData && (
          <AgendaFormStepTwo
            plannedEventData={plannedEventData! as PlannedEventType}
            handlePrev={handlePrev}
            onClose={onClose}
          />
        )}
      </ModalBody>
    </>
  );
};

export default AgendaForm;
