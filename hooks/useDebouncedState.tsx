import * as React from "react";

export function useDebouncedState<T>(
  initialValue: T,
  delay: number = 500
): [debouncedState: T, setState: (value: T) => void, rawState: T] {
  const [debouncedState, setDebouncedState] = React.useState(initialValue);
  const [rawState, setRawState] = React.useState(initialValue);
  const timeout = React.useRef<number>();

  const setState = React.useCallback(
    (newValue: T) => {
      window.clearTimeout(timeout.current);
      setRawState(newValue);
      timeout.current = window.setTimeout(
        () => setDebouncedState(newValue),
        delay
      );
    },
    [delay]
  );

  return [debouncedState, setState, rawState];
}
