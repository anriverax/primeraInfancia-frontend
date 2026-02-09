import { Button } from "@heroui/react";
import TeacherList from "@/components/ui/common/list/teacherList";
import { useAgendaFormStepTwo } from "./hook/useAgendaFormStepTwo";
import { useCallback } from "react";
import { PlannedEventType } from "../agenda.type";

type AgendaFormStepTwoProps = {
  plannedEventData: PlannedEventType;
  handlePrev: () => void;
  onClose: () => void;
};

const AgendaFormStepTwo = ({
  plannedEventData,
  handlePrev,
  onClose
}: AgendaFormStepTwoProps): React.JSX.Element => {
  const formik = useAgendaFormStepTwo(plannedEventData.id, onClose);

  const { values, handleSubmit, setFieldValue, errors } = formik;

  /*eslint-disable react-hooks/exhaustive-deps */
  const handleSelectTeacher = useCallback((value: number[]) => {
    setFieldValue("teacherIds", value);
  }, []);
  /*eslint-enable react-hooks/exhaustive-deps */
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <span className="text-sm text-neutral-500">
        <b>Evento:</b> {plannedEventData?.eventInstance.name}
      </span>
      <br />
      <span className="text-danger-500 text-[13px]">{errors.teacherIds}</span>
      <TeacherList
        teacherIds={values.teacherIds}
        supportId={plannedEventData.id}
        handleSelectTeacher={handleSelectTeacher}
        limitCount={plannedEventData?.limitCount || 0}
        existingTeachers={plannedEventData.teachers || []}
      />
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

export default AgendaFormStepTwo;
