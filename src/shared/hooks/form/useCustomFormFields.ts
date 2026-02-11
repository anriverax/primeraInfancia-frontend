import { CalendarDate, CalendarDateTime, DateValue, ZonedDateTime } from "@internationalized/date";
import { ReactNode, useCallback, useMemo } from "react";
import {
  DateProps,
  InputProps,
  SelectProps,
  TextAreaProps,
  CustomFormFieldsResult,
  ClassNamesProps
} from "../../types/customFormFields";
import { RadioGroupProps } from "@heroui/react";

/**
 * Hook that generates styled form field props for input, textarea, select, and date components.
 * @returns Object with getter functions for each field type.
 */
const useCustomFormFields = (): CustomFormFieldsResult => {
  const classNameProps = useMemo<ClassNamesProps>(
    () => ({
      variant: "bordered",
      classNames: {
        inputWrapper:
          "rounded-lg border border-neutral-100 data-[hover=true]:border-primary-600 group-data-[focus=true]:border-primary-300 group-data-[focus=true]:data-[hover=true]:border-primary-300 group-data-[invalid=true]:!border-danger-100",
        label:
          "text-neutral-400 group-data-[filled=true]:font-bold group-data-[invalid=true]:!text-danger-500",
        input: "text-neutral-500",
        errorMessage: "text-danger-500"
      }
    }),
    []
  );

  /**
   * Creates common field props (label, required, placeholder).
   * @param label - Field label text.
   * @param isRequired - Whether field is required (default: true).
   * @param placeholder - Placeholder text (default: empty).
   * @returns Object with label, isRequired, and placeholder.
   */
  const getCommonFieldProps = (
    label: string,
    isRequired: boolean = true,
    placeholder: string = ""
  ): { isRequired: boolean; label: string; placeholder: string } => ({
    isRequired,
    label,
    placeholder
  });

  /**
   * Determines validation state based on touched and error status.
   * @param touched - Whether field has been touched.
   * @param error - Error message if validation failed.
   * @returns Object with isInvalid flag and errorMessage.
   */
  const getValidationState = (
    touched: boolean | undefined,
    error: string | undefined
  ): {
    isInvalid: boolean;
    errorMessage: string | undefined;
  } => ({
    isInvalid: !!(touched && error),
    errorMessage: touched && error ? error : undefined
  });

  /**
   * Generates input field props with styling and validation.
   * @param type - Input type (text, email, password, etc.).
   * @param label - Field label text.
   * @param touched - Whether field has been touched.
   * @param error - Error message if validation failed.
   * @param isRequired - Whether field is required (default: true).
   * @returns Input component props.
   */
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
    [classNameProps]
  );
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const getRadioGroupProps = useCallback(
    (
      label: string,
      isInvalid: boolean | undefined,
      errorMessage?: ReactNode | ((v: any) => ReactNode),
      orientation: "horizontal" | "vertical" | undefined = "horizontal",
      isRequired: boolean = true
    ): RadioGroupProps => ({
      ...getCommonFieldProps(label, isRequired),
      classNames: {
        label: "text-sm after:!text-danger-500",
        errorMessage: "text-danger-500"
      },
      orientation: orientation,
      isInvalid: !!isInvalid,
      errorMessage: errorMessage
    }),
    []
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */
  /**
   * Generates textarea field props with styling and validation.
   * @param label - Field label text.
   * @param placeholder - Placeholder text.
   * @param touched - Whether field has been touched.
   * @param error - Error message if validation failed.
   * @param isRequired - Whether field is required (default: true).
   * @returns TextArea component props.
   */
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
    [classNameProps]
  );

  /**
   * Generates select field props with styling, selection handling, and validation.
   * @param label - Field label text.
   * @param placeholder - Placeholder text.
   * @param itemsLength - Number of items in select (disables if 0).
   * @param itemValue - Selected value(s), single value or array.
   * @param error - Error message if validation failed.
   * @param isRequired - Whether field is required (default: true).
   * @returns Select component props.
   */
  const getSelectProps = useCallback(
    (
      label: string,
      placeholder: string,
      itemsLength: number,
      itemValue: number | number[] | string | string[],
      error: string | undefined,
      isRequired: boolean = true
    ): SelectProps => {
      // Determine selectedKeys depending on whether it is an array or a single value
      let selectedKeys: string[];
      if (Array.isArray(itemValue)) {
        // For multiple selections: convert array of values to array of strings
        selectedKeys = itemValue.length > 0 ? itemValue.map((v) => v.toString()) : [];
      } else {
        // For simple select: convert value to array with a string
        const emptySentinel = itemValue === 0 || itemValue === -1 || itemValue === "";
        selectedKeys = emptySentinel ? [] : [itemValue.toString()];
      }

      return {
        ...getCommonFieldProps(label, isRequired, placeholder),
        variant: "bordered",
        className: "w-full",
        classNames: {
          trigger:
            "rounded-lg border border-neutral-100 h-auto data-[hover=true]:border-primary-600 data-[open=true]:border-primary-600 data-[focus=true]:border-primary-300 group-data-[invalid=true]:!border-danger-100",
          label:
            "top-4 text-neutral-400 group-data-[filled=true]:font-bold group-data-[invalid=true]:!text-danger-500",
          value: "group-data-[has-value=true]:text-neutral-500 whitespace-pre-wrap text-sm",
          listbox: "data-[hover=true]:bg-[red]"
        },
        listboxProps: {
          itemClasses: {
            base: "rounded-lg text-neutral-500 transition-opacity data-[hover=true]:font-semibold data-[hover=true]:bg-neutral-100 data-[selectable=true]:focus:bg-neutral-50 data-[pressed=true]:opacity-70 data-[selected=true]:text-neutral-700 data-[selected=true]:font-bold"
          }
        },
        selectedKeys,
        isLoading: itemsLength === 0,
        isDisabled: itemsLength === 0,
        errorMessage: error ? error : undefined
      };
    },
    []
  );
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /**
   * Generates date field props with styling.
   * @param value - Current date value or string.
   * @param name - Field name attribute.
   * @param label - Field label text.
   * @param description - Field description text.
   * @returns Date component props.
   */
  const getDateProps = useCallback(
    (
      value: DateValue | null | CalendarDate | CalendarDateTime | ZonedDateTime,
      name: string,
      label: string,
      touched: boolean | undefined,
      error: string | undefined,
      isRequired: boolean = true
    ): DateProps =>
      ({
        ...getCommonFieldProps(label, isRequired),
        name,
        value: value as any,
        variant: "bordered",
        classNames: {
          inputField: "text-[red]",
          inputWrapper:
            "rounded-lg border border-neutral-100 hover:border-primary-600 focus-within:hover:border-primary-300 group-data-[invalid=true]:!border-danger-100"
        },
        calendarProps: {
          classNames: {
            cellButton: "data-[selected=true]:bg-primary-600 data-[selected=true]:text-white"
          }
        },
        ...getValidationState(touched, error)
      }) as const,
    []
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return { getInputProps, getRadioGroupProps, getDateProps, getTextAreaProps, getSelectProps };
};

export { useCustomFormFields };
