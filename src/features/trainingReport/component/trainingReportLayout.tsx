import { useTrainingReportModalStore } from "@/shared/hooks/store/useTrainingReportModalStore";
import { useTrainingReportsList } from "../hooks/trainingReport/useTrainingReportList";

import TrainingReportTable from "./table";

const TrainingReportLayout = (): React.JSX.Element => {
  const { isVisible, typeModal, toggleVisibility } = useTrainingReportModalStore();
  const { trainingReportsList } = useTrainingReportsList();

  return (
    <>
      <TrainingReportTable trainingReportsList={trainingReportsList} />
    </>
  );
};

export default TrainingReportLayout;
