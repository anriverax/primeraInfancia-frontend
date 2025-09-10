import { useTrainingReportsList } from "../hooks/trainingReport/useTrainingReportList";

import TrainingReportTable from "./table";

const TrainingReportLayout = (): React.JSX.Element => {
  const { trainingReportsList } = useTrainingReportsList();

  return (
    <>
      <TrainingReportTable trainingReportsList={trainingReportsList} />
    </>
  );
};

export default TrainingReportLayout;
