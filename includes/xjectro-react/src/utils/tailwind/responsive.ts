import { cn } from "../../lib/utils";
import { type ResponsiveValue } from "../../types/responsive";
import { isResponsiveObject } from "../../lib/type-guards";

export function getResponsiveClasses<T>(
  value?: ResponsiveValue<T>,
  prefix = "",
  transform?: (value: T) => string,
): string {
  if (!value) return "";

  const classes: string[] = [];

  if (!isResponsiveObject(value)) {
    const transformedValue = transform ? transform(value) : value;
    classes.push(`${prefix}-${transformedValue}`);
    return classes.join(" ");
  }

  if ("default" in value && value.default !== undefined) {
    const defaultValue = value.default as T;
    const transformedValue = transform ? transform(defaultValue) : defaultValue;
    classes.push(`${prefix}-${transformedValue}`);
  }

  for (const [breakpoint, breakpointValue] of Object.entries(value)) {
    if (breakpoint !== "default" && breakpointValue !== undefined) {
      const transformedValue = transform
        ? transform(breakpointValue as T)
        : breakpointValue;
      classes.push(`${breakpoint}:${prefix}-${transformedValue}`);
    }
  }

  return cn(classes);
}

export const safelistClasses = `
  grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12
  sm:grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 sm:grid-cols-4 sm:grid-cols-5 sm:grid-cols-6
  md:grid-cols-1 md:grid-cols-2 md:grid-cols-3 md:grid-cols-4 md:grid-cols-5 md:grid-cols-6
  lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6
  xl:grid-cols-1 xl:grid-cols-2 xl:grid-cols-3 xl:grid-cols-4 xl:grid-cols-5 xl:grid-cols-6
  2xl:grid-cols-1 2xl:grid-cols-2 2xl:grid-cols-3 2xl:grid-cols-4 2xl:grid-cols-5 2xl:grid-cols-6
  
  gap-0 gap-1 gap-2 gap-3 gap-4 gap-5 gap-6 gap-8 gap-10
  sm:gap-0 sm:gap-1 sm:gap-2 sm:gap-3 sm:gap-4 sm:gap-5 sm:gap-6 sm:gap-8 sm:gap-10
  md:gap-0 md:gap-1 md:gap-2 md:gap-3 md:gap-4 md:gap-5 md:gap-6 md:gap-8 md:gap-10
  lg:gap-0 lg:gap-1 lg:gap-2 lg:gap-3 lg:gap-4 lg:gap-5 lg:gap-6 lg:gap-8 lg:gap-10
  
  p-0 p-1 p-2 p-3 p-4 p-5 p-6 p-8 p-10
  sm:p-0 sm:p-1 sm:p-2 sm:p-3 sm:p-4 sm:p-5 sm:p-6 sm:p-8 sm:p-10
  md:p-0 md:p-1 md:p-2 md:p-3 md:p-4 md:p-5 md:p-6 md:p-8 md:p-10
  lg:p-0 lg:p-1 lg:p-2 lg:p-3 lg:p-4 lg:p-5 lg:p-6 lg:p-8 lg:p-10
  
  w-full w-auto w-1/2 w-1/3 w-2/3 w-1/4 w-3/4 w-1/5 w-2/5 w-3/5 w-4/5
  sm:w-full sm:w-auto sm:w-1/2 sm:w-1/3 sm:w-2/3 sm:w-1/4 sm:w-3/4 sm:w-1/5 sm:w-2/5 sm:w-3/5 sm:w-4/5
  md:w-full md:w-auto md:w-1/2 md:w-1/3 md:w-2/3 md:w-1/4 md:w-3/4 md:w-1/5 md:w-2/5 md:w-3/5 md:w-4/5
  lg:w-full lg:w-auto lg:w-1/2 lg:w-1/3 lg:w-2/3 lg:w-1/4 lg:w-3/4 lg:w-1/5 lg:w-2/5 lg:w-3/5 lg:w-4/5
  
  text-xs text-sm text-base text-lg text-xl text-2xl text-3xl text-4xl
  sm:text-xs sm:text-sm sm:text-base sm:text-lg sm:text-xl sm:text-2xl sm:text-3xl sm:text-4xl
  md:text-xs md:text-sm md:text-base md:text-lg md:text-xl md:text-2xl md:text-3xl md:text-4xl
  lg:text-xs lg:text-sm lg:text-base lg:text-lg lg:text-xl lg:text-2xl lg:text-3xl lg:text-4xl
`;
