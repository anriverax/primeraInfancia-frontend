import { ModalBody } from "@heroui/react";
import { useEffect } from "react";
import { ClipboardList } from "lucide-react";
import StepIndicator from "@/components/ui/common/step/stepIndicatior";
import { useStepIndicatior } from "@/components/ui/common/step/useStepIndicatior";
import AttFormStepOne from "./attFormStepOne";
import AttFormStepTwo from "./attFormStepTwo";
import { useAttFormStepOne } from "./hook/useAttFormStepOne";
import { useAttFormStepTwo } from "./hook/useAttFormStepTwo";
import { useAttSelectValues } from "../list/hook/useAttSelectValues";
import { useAttSetTeacher } from "../list/hook/useAttSetTeacher";
import TeacherList from "../list/teacherList";
import { ModalHeaderContent } from "@/components/ui/modal/modalHeaderCustom";

const AttendanceForm = ({ onClose }: { onClose: () => void }): React.JSX.Element => {
  const { currentStep, steps, handleNext, handlePrev } = useStepIndicatior([
    "Seleccionar evento",
    "Agregar docentes"
  ]);

  const formikStepOne = useAttFormStepOne({ handleNext });
  const formikStepTwo = useAttFormStepTwo({ stepOneValues: formikStepOne.values, onClose });

  const { supportList, assignmentList } = useAttSelectValues(
    formikStepOne.values.isResponsible,
    formikStepOne.values.supportId.toString(),
    formikStepOne.setFieldValue
  );

  const { handleSelectTeacher } = useAttSetTeacher({
    eventInstanceId: formikStepOne.values.eventInstanceId,
    setFieldValue: formikStepTwo.setFieldValue,
    assignmentList: assignmentList
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    formikStepTwo.setFieldValue("teacherId", []);
  }, [formikStepOne.values.supportId, formikStepOne.values.eventInstanceId]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <>
      <ModalHeaderContent
        title="Registrar asistencia"
        imageSrc="/titles/agenda.png"
        icon={<ClipboardList className="h-6 w-6 text-neutral-600" />}
        variant="modal"
      />
      <ModalBody className="p-10">
        <StepIndicator currentStep={currentStep} steps={steps} />
        {currentStep === 0 && (
          <AttFormStepOne
            formikStepOne={formikStepOne}
            supportList={supportList}
            assignmentList={assignmentList}
            onClose={onClose}
          />
        )}
        {currentStep === 1 && (
          <AttFormStepTwo formikStepTwo={formikStepTwo} handlePrev={handlePrev}>
            <TeacherList
              handleSelectTeacher={handleSelectTeacher}
              teacherId={formikStepTwo.values.teacherId}
              supportId={formikStepOne.values.supportId}
            />
          </AttFormStepTwo>
        )}
      </ModalBody>
    </>
  );
};

export default AttendanceForm;
