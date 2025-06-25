import { DateValue } from "@internationalized/date";

export interface InputProps {
  type: string;
  label: string;
  isInvalid: boolean;
  isRequired: boolean;
  errorMessage: string | undefined;
  variant: "bordered";
  classNames: {
    inputWrapper: string;
    label: string;
    input: string;
  };
}

export interface DateProps extends Pick<InputProps, "label" | "variant"> {
  name: string;
  value: null;
  description: string;
  classNames: {
    inputWrapper: string;
  };
}

export interface TextAreaProps extends Pick<InputProps, "label" | "variant" | "classNames"> {
  name: string;
  placeholder: string;
}

export interface SelectProps extends Pick<InputProps, "variant"> {
  className: string;
  classNames: {
    trigger: string;
    label: string;
    value: string;
  };
  selectedKeys: string[];
  isLoading: boolean;
  isDisabled: boolean;
}

export interface CustomFormFieldsResponse {
  getInputProps: (
    _type: string,
    _label: string,
    _isInvalid: boolean | undefined,
    _error: string | undefined
  ) => InputProps;
  getDateProps: (
    _value: DateValue | string | null,
    _name: string,
    _label: string,
    _description: string
  ) => DateProps;
  getTextAreaProps: (_name: string, _label: string, _placeholder: string) => TextAreaProps;
  getSelectProps: (_itemsLength: number, _itemValue: number) => SelectProps;
}
