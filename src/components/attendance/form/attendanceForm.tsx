import { ModalBody } from "@heroui/react";
import { useEffect } from "react";
import { ClipboardList } from "lucide-react";
import ModalRegisterHeader from "@/features/admin/components/modal/modalRegisterHeader";
import StepIndicator from "@/shared/ui/custom/step/stepIndicatior";
import { useStepIndicatior } from "@/shared/ui/custom/step/useStepIndicatior";
import AttFormStepOne from "./attFormStepOne";
import AttFormStepTwo from "./attFormStepTwo";
import { useAttFormStepOne } from "./hook/useAttFormStepOne";
import { useAttFormStepTwo } from "./hook/useAttFormStepTwo";
import { useAttSelectValues } from "../list/hook/useAttSelectValues";
import { useAttSetTeacher } from "../list/hook/useAttSetTeacher";
import TeacherList from "../list/teacherList";

const AttendanceForm = ({ onClose }: { onClose: () => void }): React.JSX.Element => {
  const { currentStep, steps, handleNext, handlePrev } = useStepIndicatior([
    "Seleccionar evento",
    "Agregar docentes"
  ]);

  const formikStepOne = useAttFormStepOne({ handleNext });
  const formikStepTwo = useAttFormStepTwo({ stepOneValues: formikStepOne.values });

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

  useEffect(() => {
    formikStepTwo.setFieldValue("teacherId", []);
  }, [formikStepOne.values.supportId, formikStepOne.values.eventInstanceId]);

  return (
    <>
      <ModalRegisterHeader
        title="Registrar asistencia"
        description=""
        icon={<ClipboardList className="h-6 w-6 text-neutral-600" />}
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
