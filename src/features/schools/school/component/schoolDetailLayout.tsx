import { useSchoolModalStore } from "@/shared/hooks/store/useSchoolModalStore";
import { useSchoolDetail } from "../../hooks/school/useSchoolDetail"

import SchoolDetailTable from "./detail";
import { useParams } from "next/navigation";

const SchoolDetailLayout = (): React.JSX.Element => {
  const { isVisible, typeModal, toggleVisibility } = useSchoolModalStore();
  const params = useParams();
  const schoolId = Number(params.schoolId);
  const { schoolsDetailsList } = useSchoolDetail(schoolId);


  //const {principalPrincipalSchoolDetail } = usePrincipalSchoolDetail(schoolDetail?.PrincipalSchool[0].Person.id);

  console.log(schoolsDetailsList,"###");

  return (
    <>
      <SchoolDetailTable
        schoolsDetailsList={schoolsDetailsList} onEditSchool={function (_form: "Z" | "G", _data?: any | null): void {
          throw new Error("Function not implemented.");
        } }
      />
      {/* {isVisible && typeModal === "Z" && <SchoolForm />} */}
    </>
  );
};

export default SchoolDetailLayout;
//schoolPersonDetailsList' to 'schoolPersonDetail' to match the expected prop in 'SchoolPersonDetailTableProps'