import { useEffect, useState, useRef } from "react";

/**
 * Options for configuring the debounced value behavior
 */
export interface UseDebouncedValueOptions {
  /**
   * Time to wait in milliseconds before updating the debounced value
   * @default 500
   */
  delay?: number;
  /**
   * If true, updates the debounced value immediately on the first call
   * @default true
   */
  leading?: boolean;
  /**
   * Maximum time to wait before forcing an update
   * @default undefined
   */
  maxWait?: number;
}

/**
 * Custom hook that returns a debounced value after a specified delay
 *
 * @template T - The type of the value to debounce
 * @param value - The value to debounce
 * @param options - Configuration options or delay in milliseconds
 * @returns An object containing the debounced value and loading state
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const { debouncedValue, isPending } = useDebouncedValue(searchTerm, { delay: 300 });
 *
 *   useEffect(() => {
 *     if (!isPending) {
 *       // Perform search with debouncedValue
 *     }
 *   }, [debouncedValue, isPending]);
 *
 *   return <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
 * };
 * ```
 */
export function useDebouncedValue<T>(
  value: T,
  options: UseDebouncedValueOptions | number = {}
): { debouncedValue: T; isPending: boolean } {
  // Normalize options
  const normalizedOptions: UseDebouncedValueOptions =
    typeof options === "number" ? { delay: options } : options;

  const { delay = 500, leading = true, maxWait } = normalizedOptions;

  // Validate delay
  const validatedDelay = Math.max(0, Number.isFinite(delay) ? delay : 500);

  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isPending, setIsPending] = useState<boolean>(false);
  const isFirstRender = useRef<boolean>(true);
  const maxWaitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Handle leading edge
    if (isFirstRender.current && leading) {
      setDebouncedValue(value);
      isFirstRender.current = false;
      return;
    }

    isFirstRender.current = false;
    setIsPending(true);

    // Set up maxWait timeout if specified
    if (maxWait && Number.isFinite(maxWait) && maxWait > 0) {
      maxWaitTimeoutRef.current = setTimeout(() => {
        setDebouncedValue(value);
        setIsPending(false);
      }, maxWait);
    }

    // Set up debounce timeout
    const debounceTimeout = setTimeout(() => {
      setDebouncedValue(value);
      setIsPending(false);

      // Clear maxWait timeout if it exists
      if (maxWaitTimeoutRef.current) {
        clearTimeout(maxWaitTimeoutRef.current);
        maxWaitTimeoutRef.current = null;
      }
    }, validatedDelay);

    // Cleanup function
    return (): void => {
      clearTimeout(debounceTimeout);
      if (maxWaitTimeoutRef.current) {
        clearTimeout(maxWaitTimeoutRef.current);
        maxWaitTimeoutRef.current = null;
      }
    };
  }, [value, validatedDelay, leading, maxWait]);

  return { debouncedValue, isPending };
}

/**
 * Simplified version that only returns the debounced value (backward compatible)
 *
 * @template T - The type of the value to debounce
 * @param value - The value to debounce
 * @param delay - Time to wait in milliseconds (default: 500ms)
 * @returns The debounced value
 *
 * @example
 * ```tsx
 * const debouncedSearchTerm = useDebouncedValueSimple(searchTerm, 300);
 * ```
 */
export function useDebouncedValueSimple<T>(value: T, delay: number = 500): T {
  const { debouncedValue } = useDebouncedValue(value, { delay, leading: true });
  return debouncedValue;
}
