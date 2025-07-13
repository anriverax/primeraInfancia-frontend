import { useSchoolModalStore } from "@/shared/hooks/store/useSchoolModalStore";
import { useSchoolsList } from "../../hooks/school/useSchoolList"

import SchoolTable from "./table";
// import SchoolForm from "./schoolForm";

const SchoolLayout = (): React.JSX.Element => {
  const { isVisible, typeModal, toggleVisibility } = useSchoolModalStore();
  const { schoolsList, onDeleteSchool } = useSchoolsList();

  return (
    <>
      <SchoolTable schoolsList={ schoolsList } onDeleteSchool={ onDeleteSchool } onEditSchool={toggleVisibility} />
      {/* {isVisible && typeModal === "Z" && <SchoolForm />} */}
    </>
  );
};

export default SchoolLayout;
