import { useSchoolsList } from "../../hooks/school/useSchoolList"

import SchoolTable from "./table";

const SchoolLayout = (): React.JSX.Element => {
  const { schoolsList } = useSchoolsList();

  return (
    <SchoolTable schoolsList={ schoolsList }  />
  );
};

export default SchoolLayout;
