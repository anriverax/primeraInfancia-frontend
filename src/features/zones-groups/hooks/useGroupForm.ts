import useAxios from "@/shared/hooks/useAxios";
import { FormikHelpers, useFormik } from "formik";
import { FetchResponse } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { GroupFormResult, GroupInput, IGroup, IGroupTable } from "../group/groupType";
import { groupShema } from "../group/groupValidation";
import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";
import { useGroupListStore } from "@/shared/hooks/store/useGroupListStore";

const initGroupValues: GroupInput = {
  name: "",
  description: "",
  memberCount: 0,
  personId: 0,
  zoneId: 0
};

const useGroupForm = (): GroupFormResult => {
  const { groupList, setGroupsList } = useGroupListStore();
  const { data, reset } = useZoneModalStore();
  const useRequest = useAxios(true);

  /* eslint-disable  @typescript-eslint/explicit-function-return-type */
  const getDataInit = () => {
    const { ...otherData } = data;

    return otherData;
  };
  /* eslint-enable  @typescript-eslint/explicit-function-return-type */
  const handleSubmit = async (
    values: GroupInput,
    formikHelpers: FormikHelpers<IGroup>
  ): Promise<void> => {
    try {
      const response: AxiosResponse<FetchResponse<IGroup>> = data
        ? await useRequest.put(`/group/update/${data.id}`, values)
        : await useRequest.post("/group/create", values);

      const result = response.data;

      showToast(String(result.message), "success");

      if (result.statusCode === HttpStatusCode.Created || result.statusCode === HttpStatusCode.Ok) {
        if (!data) {
          setGroupsList([...groupList, { ...result.data }]);
          formikHelpers.resetForm();
        } else {
          const { zoneId, personId, ...otherValues } = values;
          setGroupsList(
            groupList.map((group: IGroupTable) =>
              group.id === data.id
                ? {
                    ...group,
                    ...otherValues,
                    Zone: { id: zoneId, name: group.Zone?.name || "" },
                    Persone: { id: personId }
                  }
                : group
            )
          );
          reset();
        }
      }
    } catch (error) {
      handleFormikResponseError<IGroup>(error as AxiosError, formikHelpers);
    }
  };

  const groupFormik = useFormik({
    enableReinitialize: true,
    initialValues: data ? getDataInit() : initGroupValues,
    validationSchema: groupShema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return { groupFormik, reset, data };
};

export { useGroupForm };
