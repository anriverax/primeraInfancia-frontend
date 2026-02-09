import { FormikHelpers, useFormik } from "formik";
import { handleFormikResponseError, showToast } from "@/shared/utils/functions";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import useAxios from "@/shared/hooks/http/useAxios";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { AgendaStepTwoInput, AgendaStepTwoResponse } from "../../agenda.type";
import { agendaFormStepTwoSchema } from "../../agendaValidation";

import { invalidateQueryBySearchTerm } from "@/shared/utils/queryKeyFinder";
import { invalidateApiQuery } from "@/shared/hooks/http/useApiQuery";

const initialValuesAgendaStepTwo: AgendaStepTwoInput = {
  plannedEventId: -1,
  teacherIds: []
};

const useAgendaFormStepTwo = (
  plannedEventId: number,
  onClose: () => void
): FormikProps<AgendaStepTwoInput> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values?: AgendaStepTwoInput,
    formikHelpers?: FormikHelpers<AgendaStepTwoInput>
  ): Promise<void> => {
    try {
      const res: AxiosResponse<FetchResponse<AgendaStepTwoResponse>> = await useRequest.post(
        "/plannedEvent/teachers",
        values
      );

      const resultData = res.data;

      if (resultData.statusCode === HttpStatusCode.Created) {
        showToast(String(resultData.message), "success");
        onClose();
        await invalidateQueryBySearchTerm("agenda-table");
        await invalidateApiQuery(`plannedEvent-${plannedEventId}-edit`);
        await invalidateApiQuery(`plannedEvent-${plannedEventId}-details`);
      }
    } catch (error) {
      handleFormikResponseError<AgendaStepTwoResponse>(error as AxiosError, formikHelpers!);
    }
  };

  const formikAgendaFormStepTwo = useFormik({
    enableReinitialize: true,
    initialValues: { ...initialValuesAgendaStepTwo, plannedEventId },
    validationSchema: agendaFormStepTwoSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return formikAgendaFormStepTwo;
};

export { useAgendaFormStepTwo };
