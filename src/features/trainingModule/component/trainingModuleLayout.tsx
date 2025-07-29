import { useTrainingModuleModalStore } from "@/shared/hooks/store/useTrainingModuleModalStore";
import { useTrainingModulesList } from "../hooks/trainingModule/useTrainingModuleList";

import TrainingModuleTable from "./table";

const TrainingModuleLayout = (): React.JSX.Element => {
  const { isVisible, typeModal, toggleVisibility } = useTrainingModuleModalStore();
  const { trainingModulesList } = useTrainingModulesList();

  return (
    <>
      <TrainingModuleTable trainingModulesList={ trainingModulesList }  />
    </>
  );
};

export default TrainingModuleLayout;
