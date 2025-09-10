import { useModuleReportsList } from "../hooks/moduleReport/useModuleReportList";

import ModuleReportTable from "./table";
// import ModuleReportForm from "./moduleReportForm";

const ModuleReportLayout = (): React.JSX.Element => {
  // const { isVisible, typeModal, toggleVisibility } = useModuleReportModalStore();
  const { moduleReportsList } = useModuleReportsList();

  return (
    <>
      <ModuleReportTable moduleReportsList={moduleReportsList} />
    </>
  );
};

export default ModuleReportLayout;
