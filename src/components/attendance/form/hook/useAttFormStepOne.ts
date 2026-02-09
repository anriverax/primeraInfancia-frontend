import { useFormik } from "formik";
import { FormikProps } from "@/shared/types/globals";
import { AttStepOneInput } from "../../attendance.type";
import { attFormStepOneSchema } from "../../attendanceValidation";

const initialValuesAttStepOne: AttStepOneInput = {
  isResponsible: "",
  eventInstanceId: -1,
  modality: "",
  supportId: -1
};

const useAttFormStepOne = ({ handleNext }: { handleNext: () => void }): FormikProps<AttStepOneInput> => {
  const handleSubmit = (): void => {
    handleNext();
  };

  const formikAttFormStepOne = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesAttStepOne,
    validationSchema: attFormStepOneSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return formikAttFormStepOne;
};

export { useAttFormStepOne };
