"use client";

import ModalLayout from "@/shared/ui/modal/modalLayout";
import PasswordChange from "./partials/passwordChange";

type ModalFormsProps = {
  isOpen: boolean;
};

const ModalForms = ({ isOpen }: ModalFormsProps): React.JSX.Element => {
  return (
    <ModalLayout size="md" isOpen={isOpen}>
      <PasswordChange />
    </ModalLayout>
  );
};

export default ModalForms;
