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

export interface SelectProps
  extends Pick<InputProps, "label" | "variant" | "isRequired" | "isInvalid" | "errorMessage"> {
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

export interface CustomFormFieldsResult {
  getInputProps: (
    _type: string,
    _label: string,
    _touched: boolean | undefined,
    _error: string | undefined,
    _isRequired?: boolean
  ) => InputProps;
  getTextAreaProps: (
    _label: string,
    _placeholder: string,
    _touched: boolean | undefined,
    _error: string | undefined,
    _isRequired?: boolean
  ) => TextAreaProps;
  getSelectProps: (
    _label: string,
    _placeholder: string,
    _itemsLength: number,
    _itemValue: number,
    _touched: boolean | undefined,
    _error: string | undefined,
    _isRequired?: boolean
  ) => SelectProps;
  getDateProps: (
    _value: DateValue | string | null,
    _name: string,
    _label: string,
    _description: string
  ) => DateProps;
}
