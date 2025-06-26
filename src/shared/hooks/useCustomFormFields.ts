import { DateValue } from "@internationalized/date";
import { useCallback } from "react";
import {
  DateProps,
  InputProps,
  SelectProps,
  TextAreaProps,
  CustomFormFieldsResponse,
  ClassNamesProps
} from "../types/customFormFields";

const useCustomFormFields = (): CustomFormFieldsResponse => {
  const classNameProps: ClassNamesProps = {
    variant: "bordered",
    classNames: {
      inputWrapper: "border data-[hover=true]:border-blue-500 group-data-[focus=true]:border-blue-500",
      label: "group-data-[filled=true]:font-bold",
      input: "text-gray-600"
    }
  };

  const getCommonFieldProps = (label: string, isRequired: boolean = true) => ({
    isRequired,
    label
  });

  const getValidationState = (touched: boolean | undefined, error: string | undefined) => ({
    isInvalid: !!(touched && error),
    errorMessage: touched && error ? error : undefined
  });

  const getInputProps = useCallback(
    (
      type: string,
      label: string,
      touched: boolean | undefined,
      error: string | undefined,
      isRequired: boolean = true
    ): InputProps => ({
      ...getCommonFieldProps(label, isRequired),
      type,
      ...classNameProps,
      ...getValidationState(touched, error)
    }),
    []
  );

  const getTextAreaProps = useCallback(
    (
      label: string,
      placeholder: string,
      touched: boolean | undefined,
      error: string | undefined,
      isRequired: boolean = true
    ): TextAreaProps => ({
      ...getCommonFieldProps(label, isRequired),
      placeholder,
      ...classNameProps,
      ...getValidationState(touched, error)
    }),
    []
  );

  const getDateProps = useCallback(
    (value: DateValue | string | null, name: string, label: string, description: string): DateProps =>
      ({
        name,
        label,
        value: value as any,
        variant: "bordered",
        classNames: {
          inputWrapper: "border hover:border-blue-500 focus-within:border-blue-500"
        },
        description
      }) as const,
    []
  );

  const getSelectProps = useCallback(
    (itemsLength: number, itemValue: number): SelectProps =>
      ({
        variant: "bordered",
        className: "w-full",
        classNames: {
          trigger:
            "border data-[hover=true]:border-blue-500 data-[open=true]:border-blue-500 data-[focus=true]:border-blue-500",
          label: "group-data-[filled=true]:font-bold",
          value: "group-data-[has-value=true]:text-gray-600"
        },
        selectedKeys: [itemValue === 0 ? "" : itemValue.toString()],
        isLoading: itemsLength === 0,
        isDisabled: itemsLength === 0
      }) as const,
    []
  );

  return { getInputProps, getDateProps, getTextAreaProps, getSelectProps };
};

export { useCustomFormFields };
