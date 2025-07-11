import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched } from "formik";

export interface FetchResponse<T> {
  statusCode: number;
  message: string[] | string;
  data: T;
}

export interface AxiosMessage {
  axiosMessage?: string | string[];
}

export interface FormikProps<T> {
  values: T;
  touched: FormikTouched<T>;
  errors: FormikErrors<T>;
  isSubmitting: boolean;
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  handleChange: (_e: React.ChangeEvent<any>) => void;
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  handleBlur: (_e: React.FocusEvent<any, Element>) => void;
  handleSubmit: (_e?: React.FormEvent<HTMLFormElement>) => void;
  status?: number;
  setStatus: (_status: number | undefined) => void;
  setFieldValue: (
    _field: string,
    _value: any,
    _shouldValidate?: boolean
  ) => Promise<FormikErrors<T>> | Promise<void>;

  getFieldProps: (_nameOrOptions: string | FieldConfig<any>) => FieldInputProps<any>;
}

export interface IColumns<T> {
  key: T;
  label: string;
}
