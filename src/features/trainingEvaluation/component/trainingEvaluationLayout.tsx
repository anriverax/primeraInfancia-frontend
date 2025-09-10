import { useTrainingEvaluationsList } from "../hooks/trainingEvaluation/useTrainingEvaluationList";

import TrainingEvaluationTable from "./table";

const TrainingEvaluationLayout = (): React.JSX.Element => {
  const { trainingEvaluationsList } = useTrainingEvaluationsList();

  return (
    <>
      <TrainingEvaluationTable trainingEvaluationsList={trainingEvaluationsList} />
    </>
  );
};

export default TrainingEvaluationLayout;
