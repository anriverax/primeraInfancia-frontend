import { DateValue } from "@internationalized/date";
import { useCallback } from "react";
import {
  DateProps,
  InputProps,
  SelectProps,
  TextAreaProps,
  CustomFormFieldsResponse
} from "../types/customFormFields";

const useCustomFormFields = (): CustomFormFieldsResponse => {
  const getInputProps = useCallback(
    (
      type: string,
      label: string,
      touched: boolean | undefined,
      error: string | undefined,
      isRequired: boolean = true
    ): InputProps =>
      ({
        isRequired,
        type,
        label,
        variant: "bordered",
        classNames: {
          inputWrapper:
            "border data-[hover=true]:border-blue-500 group-data-[focus=true]:border-blue-500",
          label: "group-data-[filled=true]:font-bold",
          input: "text-gray-600"
        },
        isInvalid: Boolean(touched && error),
        errorMessage: touched ? error : undefined
      }) as const,
    []
  );
  /* eslint-disable*/
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

  const getTextAreaProps = useCallback(
    (name: string, label: string, placeholder: string): TextAreaProps => {
      const { variant, classNames } = getInputProps("", label, false, undefined);

      return {
        name,
        label,
        placeholder,
        variant,
        classNames
      };
    },
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
