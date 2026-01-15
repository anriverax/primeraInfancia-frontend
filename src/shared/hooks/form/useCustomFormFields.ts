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
 * Custom hook for consistent form field styling and validation across the application.
 *
 * Provides pre-configured props for form inputs, selects, textareas, and date pickers
 * following the application's design system (HeroUI + Tailwind CSS).
 *
 * **Features:**
 * - Memoized className configuration for optimal performance
 * - Consistent validation state handling
 * - Pre-built field creators for common input types
 * - Type-safe field props generation
 *
 * @returns {CustomFormFieldsResult} Object containing:
 *   - `getCommonFieldProps`: Function to get base field props (label, required, placeholder)
 *   - `getValidationState`: Function to compute validation state from touched/error
 *   - `getInputProps`: Function to create pre-styled Input field props
 *   - `getSelectProps`: Function to create pre-styled Select field props
 *   - `getTextAreaProps`: Function to create pre-styled TextArea field props
 *   - `getDateProps`: Function to create pre-styled Date picker field props
 *
 * @example
 * ```tsx
 * export const MyForm = () => {
 *   const { getInputProps, getSelectProps } = useCustomFormFields();
 *   const [values, setValues] = useState({ name: '', role: '' });
 *   const [touched, setTouched] = useState({});
 *   const [errors, setErrors] = useState({});
 *
 *   return (
 *     <form>
 *       <Input
 *         {...getInputProps('Full Name', true, 'Enter your name')}
 *         value={values.name}
 *         errorMessage={errors.name}
 *         isInvalid={!!(touched.name && errors.name)}
 *       />
 *       <Select
 *         {...getSelectProps('Role', true)}
 *         selectedKeys={new Set([values.role])}
 *       >
 *         // options
 *       </Select>
 *     </form>
 *   );
 * };
 * ```
 *
 * @performance
 * - Uses `useMemo` to avoid recreating className objects on every render
 * - Each getter function is memoized to prevent unnecessary dependencies
 * - Safe to use with Formik or other form libraries
 */
const useCustomFormFields = (): CustomFormFieldsResult => {
  const classNameProps = useMemo<ClassNamesProps>(
    () => ({
      variant: "bordered",
      classNames: {
        inputWrapper:
          "border border-gray-200 data-[hover=true]:border-blue-500 group-data-[focus=true]:border-blue-200 group-data-[invalid=true]:!border-gray-200",
        label:
          "text-gray-500 group-data-[filled=true]:font-bold group-data-[invalid=true]:!text-gray-500",
        input: "text-gray-500 group-data-[invalid=true]:!text-gray-500"
      }
    }),
    []
  );

  const getCommonFieldProps = (
    label: string,
    isRequired: boolean = true,
    placeholder: string = ""
  ): { isRequired: boolean; label: string; placeholder: string } => ({
    isRequired,
    label,
    placeholder
  });

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
