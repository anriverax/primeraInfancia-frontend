import { useSchoolModalStore } from "@/shared/hooks/store/useSchoolModalStore";
import { useSchoolDetail } from "../../hooks/school/useSchoolDetail"

import SchoolDetailTable from "./detail";
import { useParams } from "next/navigation";
// import SchoolForm from "./schoolForm";

const SchoolDetailLayout = (): React.JSX.Element => {
  const { isVisible, typeModal, toggleVisibility } = useSchoolModalStore();
   const params = useParams();
  const schoolId = Number(params.schoolId);
  const { schoolDetail } = useSchoolDetail(schoolId);

  return (
    <>
      <SchoolDetailTable schoolDetail={schoolDetail} />
      {/* {isVisible && typeModal === "Z" && <SchoolForm />} */}
    </>
  );
};

export default SchoolDetailLayout;
