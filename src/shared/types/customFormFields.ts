import { CalendarDate, CalendarDateTime, DateValue, ZonedDateTime } from "@internationalized/date";
import { RadioGroupProps } from "@heroui/react";
import { ReactNode } from "react";

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

export interface DateProps
  extends Pick<InputProps, "label" | "variant" | "isRequired" | "isInvalid" | "errorMessage"> {
  name: string;
  value: DateValue | null | CalendarDate | CalendarDateTime | ZonedDateTime;
  classNames: { inputField: string; inputWrapper: string };
  calendarProps: { classNames: { cellButton: string } };
}

export interface TextAreaProps
  extends Pick<
    InputProps,
    "label" | "variant" | "classNames" | "isRequired" | "isInvalid" | "errorMessage"
  > {
  placeholder: string;
}

export interface SelectProps
  extends Pick<InputProps, "label" | "variant" | "isRequired" | "errorMessage"> {
  placeholder: string;
  className: string;
  classNames: {
    trigger: string;
    label: string;
    value: string;
    listbox: string;
  };
  listboxProps: {
    itemClasses: {
      base: string;
    };
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
  getRadioGroupProps: (
    _label: string,
    _isInvalid: boolean | undefined,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    _errorMessage?: ReactNode | ((v: any) => ReactNode),
    /* eslint-enable @typescript-eslint/no-explicit-any */
    _orientation?: "horizontal" | "vertical" | undefined,
    _isRequired?: boolean
  ) => RadioGroupProps;
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
    _itemValue: number | number[] | string | string[],
    _error: string | undefined,
    _isRequired?: boolean
  ) => SelectProps;
  getDateProps: (
    _value: DateValue | null | CalendarDate | CalendarDateTime | ZonedDateTime,
    _name: string,
    _label: string,
    _touched: boolean | undefined,
    _error: string | undefined,
    _isRequired?: boolean
  ) => DateProps;
}
