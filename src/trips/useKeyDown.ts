import { useLayoutEffect } from "react";

export function useKeyDown(callback: (event: KeyboardEvent) => void) {
  useLayoutEffect(() => {
    window.addEventListener("keydown", callback);

    return () => {
      window.removeEventListener("keydown", callback);
    };
  }, [callback]);
}
