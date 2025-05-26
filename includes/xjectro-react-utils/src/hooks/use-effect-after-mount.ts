import React from "react";

export function useEffectAfterMount(fn: () => void, deps: any[] = []) {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    fn();
  }, [deps]);
}
