import type { ResponsiveObject, ResponsiveValue } from "../types/responsive";

export function isResponsiveObject<T>(
  value: ResponsiveValue<T>,
): value is ResponsiveObject<T> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
