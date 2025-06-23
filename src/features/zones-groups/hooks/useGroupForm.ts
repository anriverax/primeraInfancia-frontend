import useAxios from "@/shared/hooks/useAxios";
import { FormikHelpers, useFormik } from "formik";
import { groupValidation } from "../groupValidation";
import { GroupData, GroupSchema } from "../zonesGroupType";
import { FormikProps } from "@/shared/types/globals";
import { IZoneList } from "../zoneType";

type UseZoneFormProps = {
  data?: IZoneList | null;
};

const initValuesGroup: GroupData = {
  name: "",
  description: "",
  memberCount: 0,
  zoneId: 0
};

const useGroupForm = ({ data }: UseZoneFormProps): FormikProps<GroupSchema> => {
  const useRequest = useAxios(true);
  console.log(useRequest);
  console.log(data);
  const handleSubmit = async (
    values: GroupData,
    formikHelpers: FormikHelpers<GroupSchema>
  ): Promise<void> => {
    console.log(values);
    console.log(formikHelpers);
    try {
      console.log(1);
    } catch (error) {
      console.log(error);
    }
  };

  const groupFormik = useFormik({
    enableReinitialize: true,
    initialValues: initValuesGroup,
    validationSchema: groupValidation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return groupFormik;
};

export { useGroupForm };
