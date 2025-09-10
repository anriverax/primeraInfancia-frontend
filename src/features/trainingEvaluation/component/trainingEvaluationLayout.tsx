import { useTrainingEvaluationModalStore } from "@/shared/hooks/store/useTrainingEvaluationModalStore";
import { useTrainingEvaluationsList } from "../hooks/trainingEvaluation/useTrainingEvaluationList";

import TrainingEvaluationTable from "./table";

const TrainingEvaluationLayout = (): React.JSX.Element => {
  const { isVisible, typeModal, toggleVisibility } = useTrainingEvaluationModalStore();
  const { trainingEvaluationsList } = useTrainingEvaluationsList();

  return (
    <>
      <TrainingEvaluationTable trainingEvaluationsList={trainingEvaluationsList} />
    </>
  );
};

export default TrainingEvaluationLayout;
