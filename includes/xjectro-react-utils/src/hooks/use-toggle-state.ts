import React from "react";

export function useToggleState(initialState = false) {
  const [state, setState] = React.useState(initialState);

  const toggle = React.useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, toggle] as const;
}
