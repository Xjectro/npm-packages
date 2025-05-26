import { useEffect, useState } from "react";

export function usePersistedState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem(key);

      if (!item) {
        setValue(initialValue);
      } else {
        setValue(JSON.parse(item) as T);
      }
    }
  }, [key, initialValue]);

  useEffect(() => {
    if (value !== undefined) {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  }, [key, value]);

  return [value ?? initialValue, setValue] as const;
}
