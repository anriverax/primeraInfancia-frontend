import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched } from "formik";

export interface FetchResponse<T> {
  statusCode: number;
  message: string[] | string;
  data: T;
}

export interface IPagination {
  total: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
  prev: number | null;
  next: number | null;
}

export interface FetchResponseWithPagination<T> extends FetchResponse<T> {
  meta?: IPagination;
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

  setTouched?: (touched: FormikTouched<T>, shouldValidate?: boolean) => void;
  setFieldTouched?: (field: string, touched?: boolean, shouldValidate?: boolean) => void;
  getFieldProps: (_nameOrOptions: string | FieldConfig<any>) => FieldInputProps<any>;
}

export interface IColumns<T> {
  key: T;
  label: string;
  sortable?: boolean;
}

export interface IPerson {
  id: number;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
}

export interface IDistrictWithZone {
  Municipality: {
    name: string;
    Department: {
      name: string;
      Zone: {
        name: string;
      };
    };
  };
}

export interface IOptions {
  key: string | number;
  label: string;
}
