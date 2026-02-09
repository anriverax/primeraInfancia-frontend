import { FormikHelpers, useFormik } from "formik";
import { FormikProps } from "@/shared/types/globals";
import { AgendaStepOneInput, AgendaStepOneResponse, PlannedEventType } from "../../agenda.type";
import { agendaFormStepOneSchema } from "../../agendaValidation";
import { AxiosError, AxiosResponse } from "axios";
import {
  formatForBackend,
  handleFormikResponseError,
  parseCustomDateFormatToZonedDateTime
} from "@/shared/utils/functions";
import useAxios from "@/shared/hooks/http/useAxios";
import { DateValue, getLocalTimeZone, now } from "@internationalized/date";

const initialValuesAgendaStepOne: AgendaStepOneInput = {
  trainingModuleId: -1,
  eventInstanceId: -1,
  start: now(getLocalTimeZone()),
  description: ""
};

const getInitialValues = (plannedEventData: PlannedEventType): AgendaStepOneInput => {
  if (plannedEventData) {
    return {
      trainingModuleId: plannedEventData.module.id,
      eventInstanceId: plannedEventData.eventInstance.id,
      /* eslint-disable @typescript-eslint/no-explicit-any */
      start: parseCustomDateFormatToZonedDateTime(plannedEventData.start) as any,
      /* eslint-enable @typescript-eslint/no-explicit-any */
      description: plannedEventData.description || ""
    };
  }

  return initialValuesAgendaStepOne;
};

const useAgendaFormStepOne = (
  onSuccess: (id: number) => void,
  plannedEventData: PlannedEventType
): FormikProps<AgendaStepOneInput> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values?: AgendaStepOneInput,
    formikHelpers?: FormikHelpers<AgendaStepOneInput>
  ): Promise<void> => {
    let res: AxiosResponse<AgendaStepOneResponse> = {} as AxiosResponse<AgendaStepOneResponse>;

    try {
      const data = {
        ...values,
        start: formatForBackend(values?.start as DateValue | null)
      };
      if (!plannedEventData) {
        res = await useRequest.post("/plannedEvent", data);
      } else {
        res = await useRequest.put(`/plannedEvent/${plannedEventData.id}`, data);
      }
      onSuccess(Number(res.data));
    } catch (error) {
      handleFormikResponseError<AgendaStepOneResponse>(error as AxiosError, formikHelpers!);
    }
  };

  const formikAgendaFormStepOne = useFormik({
    enableReinitialize: true,
    initialValues: getInitialValues(plannedEventData),
    validationSchema: agendaFormStepOneSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return formikAgendaFormStepOne;
};

export { useAgendaFormStepOne };
