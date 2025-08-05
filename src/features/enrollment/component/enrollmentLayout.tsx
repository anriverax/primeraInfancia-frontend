import { useEnrollmentModalStore } from "@/shared/hooks/store/useEnrollmentModalStore";
import { useEnrollmentsList } from "../hooks/enrollment/useEnrollmentList";

import EnrollmentTable from "./table";
// import EnrollmentForm from "./enrollmentForm";

const EnrollmentLayout = (): React.JSX.Element => {
  const { isVisible, typeModal, toggleVisibility } = useEnrollmentModalStore();
  const { enrollmentsList } = useEnrollmentsList();

  return (
    <>
      <EnrollmentTable enrollmentsList={enrollmentsList} />
    </>
  );
};

export default EnrollmentLayout;
