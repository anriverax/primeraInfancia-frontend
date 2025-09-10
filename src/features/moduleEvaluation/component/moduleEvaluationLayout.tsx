import { useModuleEvaluationsList } from "../hooks/moduleEvaluation/useModuleEvaluationList";

import ModuleEvaluationTable from "./table";
//import ModuleEvaluationForm from "./moduleEvaluationForm";

const ModuleEvaluationLayout = (): React.JSX.Element => {
  const { moduleEvaluationsList } = useModuleEvaluationsList();

  return (
    <>
      <ModuleEvaluationTable moduleEvaluationsList={moduleEvaluationsList} />
      {/* {isVisible && typeModal === "Z" && <ModuleEvaluationForm />} */}
    </>
  );
};

export default ModuleEvaluationLayout;
