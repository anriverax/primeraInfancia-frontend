import { useSchoolDetail } from "../../hooks/school/useSchoolDetail"

import SchoolDetailTable from "./detail";
import { useParams } from "next/navigation";

const SchoolDetailLayout = (): React.JSX.Element => {
  const params = useParams();
  const schoolId = Number(params.schoolId);
  const { schoolsDetailsList } = useSchoolDetail(schoolId);

  return (
      <SchoolDetailTable schoolsDetailsList={schoolsDetailsList} />
  );
};

export default SchoolDetailLayout;