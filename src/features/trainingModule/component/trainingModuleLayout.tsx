import { useTrainingModulesList } from "../hooks/trainingModule/useTrainingModuleList";

import TrainingModuleTable from "./table";

const TrainingModuleLayout = (): React.JSX.Element => {
  const { trainingModulesList } = useTrainingModulesList();

  return (
    <>
      <TrainingModuleTable trainingModulesList={trainingModulesList} />
    </>
  );
};

export default TrainingModuleLayout;
