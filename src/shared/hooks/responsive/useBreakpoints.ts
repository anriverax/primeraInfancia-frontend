import { breakpoints } from "../../constants";
import { useMediaQuery } from "./useMediaQuery";

// -------------------------
// useBreakpoints
export const useBreakpoints = (): {
  active: string;
  isMobile: boolean;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  isXxl: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
} => {
  let active = "xs";

  const sm = useMediaQuery(`(min-width: ${breakpoints.sm})`);
  const md: boolean = useMediaQuery(`(min-width: ${breakpoints.md})`);
  const lg = useMediaQuery(`(min-width: ${breakpoints.lg})`);
  const xl = useMediaQuery(`(min-width: ${breakpoints.xl})`);
  const xxl = useMediaQuery(`(min-width: ${breakpoints["2xl"]})`);

  // Determine the active breakpoint
  if (xxl) active = "2xl";
  else if (xl) active = "xl";
  else if (lg) active = "lg";
  else if (md) active = "md";
  else if (sm) active = "sm";

  // Determine if it is mobile
  const isMobile = !md;

  return {
    active,
    isMobile,
    isXs: !sm,
    isSm: sm && !md,
    isMd: md && !lg,
    isLg: lg && !xl,
    isXl: xl && !xxl,
    isXxl: xxl,
    // Valores booleanos directos para cada breakpoint
    sm,
    md,
    lg,
    xl,
    xxl
  };
};
