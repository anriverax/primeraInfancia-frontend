import { useModuleEvaluationModalStore } from "@/shared/hooks/store/useModuleEvaluationModalStore";
import { useModuleEvaluationsList } from "../hooks/moduleEvaluation/useModuleEvaluationList";

import ModuleEvaluationTable from "./table";
//import ModuleEvaluationForm from "./moduleEvaluationForm";

const ModuleEvaluationLayout = (): React.JSX.Element => {
  const { isVisible, typeModal, toggleVisibility } = useModuleEvaluationModalStore();
  const { moduleEvaluationsList } = useModuleEvaluationsList();

  return (
    <>
      <ModuleEvaluationTable moduleEvaluationsList={ moduleEvaluationsList }  />
      {/* {isVisible && typeModal === "Z" && <ModuleEvaluationForm />} */}
    </>
  );
};

export default ModuleEvaluationLayout;
