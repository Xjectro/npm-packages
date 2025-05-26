import React from "react";

type AnyFunction = (...args: unknown[]) => void;

export function useThrottle<T extends AnyFunction>(func: T, delay: number): T {
  const lastCall = React.useRef(0);

  return React.useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        func(...args);
      }
    }) as T,
    [func, delay],
  );
}
