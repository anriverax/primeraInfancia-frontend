import { DateValue } from "@internationalized/date";
import { useCallback, useMemo } from "react";
import {
  DateProps,
  InputProps,
  SelectProps,
  TextAreaProps,
  CustomFormFieldsResult,
  ClassNamesProps
} from "../../types/customFormFields";

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
          "border border-neutral-100 data-[hover=true]:border-primary-600 group-data-[focus=true]:border-primary-300 group-data-[invalid=true]:!border-danger-100",
        label:
          "text-neutral-500 group-data-[filled=true]:font-bold group-data-[invalid=true]:!text-danger-500",
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
            "border h-auto data-[hover=true]:border-blue-500 data-[open=true]:border-blue-500 data-[focus=true]:border-blue-500",
          label: "group-data-[filled=true]:font-bold top-4",
          value: "group-data-[has-value=true]:text-gray-600 whitespace-pre-wrap"
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
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return { getInputProps, getDateProps, getTextAreaProps, getSelectProps };
};

export { useCustomFormFields };
