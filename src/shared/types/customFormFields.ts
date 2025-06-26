import { DateValue } from "@internationalized/date";
export interface ClassNamesProps {
  variant: "bordered";
  classNames: {
    inputWrapper: string;
    label: string;
    input: string;
  };
}
export interface InputProps extends ClassNamesProps {
  type: string;
  label: string;
  isInvalid: boolean;
  isRequired: boolean;
  errorMessage: string | undefined;
}

export interface DateProps extends Pick<InputProps, "label" | "variant"> {
  name: string;
  value: null;
  description: string;
  classNames: {
    inputWrapper: string;
  };
}

export interface TextAreaProps
  extends Pick<
    InputProps,
    "label" | "variant" | "classNames" | "isRequired" | "isInvalid" | "errorMessage"
  > {
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
    _touched: boolean | undefined,
    _error: string | undefined,
    _isRequired?: boolean
  ) => InputProps;
  getDateProps: (
    _value: DateValue | string | null,
    _name: string,
    _label: string,
    _description: string
  ) => DateProps;
  getTextAreaProps: (
    _label: string,
    _placeholder: string,
    _touched: boolean | undefined,
    _error: string | undefined,
    _isRequired?: boolean
  ) => TextAreaProps;
  getSelectProps: (_itemsLength: number, _itemValue: number) => SelectProps;
}
